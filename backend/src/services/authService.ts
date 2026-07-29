import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

class AuthService {
  async register(data: RegisterUserDTO) {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "user",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      token,
      user,
    };
  }
}

export default new AuthService();