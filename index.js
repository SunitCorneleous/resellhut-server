const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// home route
app.get("/", (req, res) => {
  res.send("<h1>Resellx server is running</h1>");
});

// run app
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
