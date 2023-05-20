import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//TEST
router.get("/test", requireSignin, isAdmin, testController);

export default router;
