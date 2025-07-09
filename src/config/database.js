import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

const MAX_RETRIES = 5;
const INITIAL_DELAY = 5000;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO URI not defined in environment");

    process.exit(1);
  }

  let retries = 0;
  let delay = INITIAL_DELAY;

  while (true) {
    try {
      await mongoose.connect(MONGO_URI, { autoIndex: false });

      console.log("MongoDB connected");

      break;
    } catch (err) {
      retries++;

      console.error(
        `MongoDB connection error (attempt ${retries}):`,
        err.message
      );

      if (retries === MAX_RETRIES) {
        console.error(`Max retries (${MAX_RETRIES}) reached, exiting...`);
        break;
      }

      console.log(`Retrying connection in ${delay / 1000} seconds...`);

      await new Promise((res) => setTimeout(res, delay));

      delay = delay * 2;
    }
  }
};
