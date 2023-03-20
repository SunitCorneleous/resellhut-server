const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("products found");
});

router.get("/:id", (req, res) => {
  res.send("got the product");
});

router.post("/", (req, res) => {
  res.send("product added");
});

module.exports = router;
