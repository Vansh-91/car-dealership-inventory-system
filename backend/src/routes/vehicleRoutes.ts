import express from "express";
import { createVehicle,updateVehicle,deleteVehicle,purchaseVehicle, restockVehicle,} from "../controllers/vehicleController";
import {
  getAllVehicles,
} from "../controllers/vehicleController";
import authMiddleware from "../middleware/authMiddleware";
import validateRequest from "../middleware/validateRequest";
import { createVehicleValidation } from "../validators/vehicleValidator";
import { searchVehicles } from "../controllers/vehicleController";
import adminMiddleware from "../middleware/adminMiddleware";
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
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteVehicle
);
router.post(
  "/:id/purchase",
  authMiddleware,
  purchaseVehicle
);
router.post(
  "/:id/restock",
  authMiddleware,
  adminMiddleware,
  restockVehicle
);
export default router;