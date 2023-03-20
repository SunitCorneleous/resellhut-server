const express = require("express");

const router = express.Router();

/* router.get("/", (req, res) => {
  res.send("products found");
});

router.post("/", (req, res) => {
  res.send("product added");
}); */

router.get("/:id", (req, res) => {
  res.send("got the product");
});

// shorthand

router
  .route("/")
  .get((req, res) => {
    /**
     * @api {get} /all products
     * @apiDescription Get all products
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */

    res.send("products found");
  })
  .post((req, res) => {
    /**
     * @api {post} /post a product
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */

    res.send("product added");
  });

module.exports = router;
