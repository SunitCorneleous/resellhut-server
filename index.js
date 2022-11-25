const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// mongodb config
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jjvalws.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//verify jwt
function verifyJWT(req, res, next) {
  // get authorization from header
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  // check if the header exists
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }

  // split the token
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }

    req.decoded = decoded;
    next();
  });
}

// mongodb run
async function run() {
  try {
    const categoriesCollection = client
      .db("resellxDB")
      .collection("categories");
    const usersCollections = client.db("resellxDB").collection("users");
    const productsCollections = client.db("resellxDB").collection("products");

    // verify seller
    const verifySeller = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const filter = { email: decodedEmail };
      const user = await usersCollections.findOne(filter);

      if (user?.userType === "seller") {
        return next();
      }

      return res.status(403).send({ message: "forbidden access" });
    };

    // get all categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
    });

    //save user to db
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };

      const exists = await usersCollections.findOne(query);

      if (exists) {
        return res.send({ exists: true });
      }

      const result = await usersCollections.insertOne(user);
      res.send(result);
    });

    //get jwt
    app.get("/jwt", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const user = await usersCollections.findOne(query);

      if (user) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "7h",
        });
        return res.send({ accessToken: token });
      }

      res.status(403).send({ accessToken: "" });
    });

    // check user type
    app.get("/usertype", async (req, res) => {
      const email = req.query.email;
      const query = {};

      const allUsers = await usersCollections.find(query).toArray();
      const user = allUsers.find(user => user.email === email);

      res.send({ userType: user.userType });
    });

    // add products to db as seller
    app.post("/products", verifyJWT, verifySeller, async (req, res) => {
      const product = req.body;
      const sellerFilter = { email: product.sellerEmail };

      const postedTime = new Date();
      const sellerVerification = await usersCollections.findOne(sellerFilter)
        .verified;

      product.posted = postedTime;
      product.sellerVerification = sellerVerification;
      product.saleStatus = "unsold";

      const result = await productsCollections.insertOne(product);

      console.log(result);

      res.send(result);
    });
  } finally {
  }
}

run().catch(error => console.log(error));

// home route
app.get("/", (req, res) => {
  res.send("<h1>Resellx server is running</h1>");
});

// run app
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
