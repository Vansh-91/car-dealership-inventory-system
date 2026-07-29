import { body } from "express-validator";

export const createVehicleValidation = [
  body("make")
    .trim()
    .notEmpty()
    .withMessage("Make is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
];