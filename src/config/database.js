import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO URI not defined in environment");

    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { autoIndex: false });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
};
