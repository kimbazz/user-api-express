import { Router } from "express";
import UserController from "../controllers/UserController.js";
import UserValidator from "../validators/UserValidator.js";
import validateRequest from "../../middleware/validateRequest.js";

const router = Router();

router.post(
  "/",
  UserValidator.create(),
  validateRequest,
  UserController.create
);

router.get("/", UserController.getAll);

router.get(
  "/:id",
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
