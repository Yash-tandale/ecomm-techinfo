import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//FORGOT-PASSWORD
router.post("/forgot-password", forgotPasswordController);

//TEST
router.get("/test", requireSignin, isAdmin, testController);

//PROTECTED USER ROUTE
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//PROTECTED ADMIN ROUTE
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
