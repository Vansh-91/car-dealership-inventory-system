import { Request, Response } from "express";
import authService from "../services/authService";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: result.token,
      user: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    });
  }  catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : "Internal Server Error";

  res.status(400).json({
    success: false,
    message,
  });
}
};