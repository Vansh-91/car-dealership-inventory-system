import { Request, Response } from "express";
import vehicleService from "../services/vehicleService";

export const createVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create vehicle",
    });
  }
};
export const getAllVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await vehicleService.getAllVehicles();

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }

};
export const searchVehicles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await vehicleService.searchVehicles(req.query);

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to search vehicles",
    });
  }
};