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

// mongodb run

async function run() {
  try {
    const categoriesCollection = client
      .db("resellxDB")
      .collection("categories");
    const usersCollections = client.db("resellxDB").collection("users");

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
