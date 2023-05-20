import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to db... ${response.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
