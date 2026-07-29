import express from "express";
import { createVehicle } from "../controllers/vehicleController";
import {
  getAllVehicles,
} from "../controllers/vehicleController";
import authMiddleware from "../middleware/authMiddleware";
import validateRequest from "../middleware/validateRequest";
import { createVehicleValidation } from "../validators/vehicleValidator";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createVehicleValidation,
  validateRequest,
  createVehicle
);
router.get(
  "/",
  authMiddleware,
  getAllVehicles
);
export default router;