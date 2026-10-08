import "dotenv/config";
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.SANDBOX);
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("MongoDB connection error: ", err);
    process.exit(1);
  }
};

