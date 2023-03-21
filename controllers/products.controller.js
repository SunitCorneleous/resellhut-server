let allProducts = [
  { id: 1, name: "product 1" },
  { id: 2, name: "product 1" },
  { id: 3, name: "product 1" },
  { id: 4, name: "product 1" },
  { id: 5, name: "product 1" },
];

module.exports.getAllProducts = (req, res, next) => {
  res.send("Found all products");
};

module.exports.addAProduct = (req, res, next) => {
  res.send("product added");
};

module.exports.removeProduct = (req, res, next) => {
  const { id } = req.params;

  const remaining = allProducts.filter(item => item.id !== parseInt(id));

  res.json(remaining);
};
