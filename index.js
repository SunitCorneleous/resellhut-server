const express = require("express");
const app = express();
const cors = require("cors");
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

    // get all categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories);
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
