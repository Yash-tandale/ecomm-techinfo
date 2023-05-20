import userModel from "../models/userModel.js";

import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }

    if (!email) {
      return res.send({ error: "Email is required" });
    }

    if (!password) {
      return res.send({ error: "Password is required" });
    }

    if (!phone) {
      return res.send({ error: "Phone is required" });
    }

    if (!address) {
      return res.send({ error: "Address is required" });
    }

    //check existing user
    const verifyEmail = await userModel.findOne({ email });
    if (verifyEmail) {
      res.status(200).send({
        success: true,
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
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfull !!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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

export const testController = (req, res) => {
  res.send({ message: "Protected routes" });
};
