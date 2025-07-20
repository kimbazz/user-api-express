import { Router } from "express";
import UserController from "../controllers/UserController.js";
import UserValidator from "../validators/UserValidator.js";
import validateRequest from "../../middleware/validateRequest.js";
import jwtAuth from "../../middleware/jwtAuth.js";

/**
 * Factory that creates the user routes with injected dependencies.
 * @param {{ userUC }} deps
 */
export default function userRoutes({ userUC }) {
  const router = Router();
  // instantiate controller with injected use-case
  const userController = new UserController({ userUC });

  router.post("/", UserValidator.create(), validateRequest, (req, res, next) =>
    userController.create(req, res, next)
  );

  router.post(
    "/login",
    UserValidator.login(),
    validateRequest,
    (req, res, next) => userController.login(req, res, next)
  );

  router.get("/", jwtAuth, (req, res, next) =>
    userController.getAll(req, res, next)
  );

  router.get(
    "/:id",
    jwtAuth,
    UserValidator.idParam(),
    validateRequest,
    (req, res, next) => userController.getById(req, res, next)
  );

  router.put(
    "/:id",
    UserValidator.update(),
    validateRequest,
    (req, res, next) => userController.update(req, res, next)
  );

  router.delete(
    "/:id",
    UserValidator.idParam(),
    validateRequest,
    (req, res, next) => userController.delete(req, res, next)
  );

  return router;
}
