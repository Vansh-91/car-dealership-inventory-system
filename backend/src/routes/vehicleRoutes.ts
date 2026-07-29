import express from "express";
import { createVehicle,updateVehicle } from "../controllers/vehicleController";
import {
  getAllVehicles,
} from "../controllers/vehicleController";
import authMiddleware from "../middleware/authMiddleware";
import validateRequest from "../middleware/validateRequest";
import { createVehicleValidation } from "../validators/vehicleValidator";
import { searchVehicles } from "../controllers/vehicleController";
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
router.get(
  "/search",
  authMiddleware,
  searchVehicles
);
router.put(
  "/:id",
  authMiddleware,
  createVehicleValidation,
  validateRequest,
  updateVehicle
);
export default router;