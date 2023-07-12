import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  getPhoto,
  productCountController,
  productFilters,
  productListController,
  searchProductController,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProduct
);

//get all products
router.get("/getAll-product", getAllProduct);

//get one product
router.get("/getOne-product/:slug", getOneProduct);

//get one photo
router.get("/get-photo/:id", getPhoto);

//delete product
router.delete("/delete-product/:id", requireSignin, isAdmin, deleteProduct);

//update product
router.put(
  "/update-product/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateProduct
);

//filter products
router.post("/product-filters", productFilters);

//product count
router.get("/product-count", productCountController);

//product list
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

export default router;
