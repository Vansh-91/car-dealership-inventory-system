import express from "express";
import { register,login } from "../controllers/authController";
import { registerValidation,loginValidation } from "../validators/authValidator";
import validateRequest from "../middleware/validateRequest";
const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validateRequest,
    register
);
router.post(
  "/login",
  loginValidation,
  validateRequest,
  login
);

export default router;