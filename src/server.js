import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./interfaces/http/routes/userRoutes.js";
import errorHandler from "./interfaces/middleware/errorHandler.js";
import { APP_PORT } from "./config/index.js";
import cors from "cors";
import bodyParser from "body-parser";

await connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(APP_PORT || 3000, () =>
  console.log(`API up on port ${APP_PORT || 3000}`)
);
