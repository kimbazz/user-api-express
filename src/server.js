import express from "express";
import { connectDB } from "./config/database.js";
import userRoutes from "./interfaces/http/routes/userRoutes.js";
import errorHandler from "./interfaces/middleware/errorHandler.js";
import { PORT } from "./config/index.js";
import cors from "cors";
import bodyParser from "body-parser";

import userModel from "./infrastructure/models/user.model.js";
import UserRepoImpl from "./infrastructure/repositories/UserRepositoryImpl.js";
import UserCase from "./usecases/User.js";

await connectDB();

const userRepo = new UserRepoImpl(userModel);
const userUC = new UserCase({ userRepo });

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRoutes({ userUC }));
app.use(errorHandler);

app.listen(PORT || 3000, () => console.log(`API up on port ${PORT || 3000}`));
