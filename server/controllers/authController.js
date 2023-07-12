import userModel from "../models/userModel.js";

import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validation
    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone is required" });
    }

    if (!address) {
      return res.send({ message: "Address is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //check existing user
    const verifyEmail = await userModel.findOne({ email });
    if (verifyEmail) {
      res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }

    //register user
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    });
    const user = await data.save();
    res.status(200).json({
      success: true,
      message: "User registered !!",
      user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({ message: "User not found" });
    }

    //compare password
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(500).send({ message: "Invalid password" });
    }

    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "100d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfull !!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
    console.log(error);
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }

    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "New password is required" });
    }

    //check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(400).send({
        message: "Invalid email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset successfully !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgotPassword",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send({ message: "Protected routes" });
};
