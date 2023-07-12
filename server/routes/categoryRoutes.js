import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

//create category
router.post("/create-category", requireSignin, isAdmin, createCategory);

//update category
router.put("/update-category/:id", requireSignin, isAdmin, updateCategory);

//delete category
router.delete("/delete-category/:id", requireSignin, isAdmin, deleteCategory);

//getAll category
router.get("/getAll-category", getAllCategory);

//getOne category
router.get("/getOne-category/:slug", getOneCategory);

export default router;
