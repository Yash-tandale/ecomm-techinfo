import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("Hello from server");
});

//port
const PORT = process.env.PORT || 8000;

//create server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.bgCyan.white)
);
