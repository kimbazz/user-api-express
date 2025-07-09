import { body, param } from "express-validator";

export default class UserValidator {
  static idParam() {
    return param("id").isMongoId().withMessage("User ID format is not valid");
  }

  static create() {
    return [
      body("name").trim().notEmpty().withMessage("Name is required"),
      body("email")
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6+ characters"),
    ];
  }

  /** Validation rules for updating an existing user */
  static update() {
    return [
      UserValidator.idParam(),
      body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),
      body("email")
        .optional()
        .isEmail()
        .withMessage("Must be a valid email")
        .normalizeEmail(),
      body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be 6+ characters"),
    ];
  }
}
