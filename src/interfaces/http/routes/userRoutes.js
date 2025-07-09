import { Router } from "express";
import UserController from "../controllers/UserController.js";
import UserValidator from "../validators/UserValidator.js";
import validateRequest from "../../middleware/validateRequest.js";
import jwtAuth from "../../middleware/jwtAuth.js";

const router = Router();

router.post(
  "/",
  UserValidator.create(),
  validateRequest,
  UserController.create
);

router.post(
  "/login",
  UserValidator.login(),
  validateRequest,
  UserController.login
);

router.get("/", jwtAuth, UserController.getAll);

router.get(
  "/:id",
  jwtAuth,
  UserValidator.idParam(),
  validateRequest,
  UserController.getById
);

router.put(
  "/:id",
  UserValidator.update(),
  validateRequest,
  UserController.update
);

router.delete(
  "/:id",
  UserValidator.idParam(),
  validateRequest,
  UserController.delete
);

export default router;
