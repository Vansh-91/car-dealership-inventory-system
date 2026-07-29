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
export const updateVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await vehicleService.updateVehicle(
      req.params.id as string,
      req.body
    );

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  
};
export const deleteVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await vehicleService.deleteVehicle(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
export const purchaseVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await vehicleService.purchaseVehicle(
      req.params.id as string
    );

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const restockVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicle = await vehicleService.restockVehicle(
      req.params.id as string,
      Number(req.body.quantity)
    );

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};