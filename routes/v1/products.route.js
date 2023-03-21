const express = require("express");
const viewCount = require("../../middleware/viewCount.js");
const productController = require("./../../controllers/products.controller.js");
const router = express.Router();

router
  .route("/")
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
  .get(viewCount, productController.getAllProducts)
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
  .post(productController.addAProduct);

router.route("/:id").delete(productController.removeProduct);

module.exports = router;
