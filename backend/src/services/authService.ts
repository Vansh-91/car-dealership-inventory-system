import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import generateToken from "../utils/generateToken";

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

  const token = generateToken({
  id: user._id.toString(),
  role: user.role,
});

    return {
      token,
      user,
    };
  }
  async login(email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  return {
    token,
    user,
  };
}
}


export default new AuthService();