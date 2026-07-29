import { Link, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { loginSchema } from "../schemas/authSchema";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import type { LoginData } from "../types/auth";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);

      login(response.token, response.user);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[180px] rounded-full"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-card/90 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-primary p-5 rounded-full shadow-lg">
            <FaCarSide className="text-background text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-wide text-center text-text mt-6">
          Car Dealership Inventory
        </h1>

        <p className="text-text-secondary text-center mt-2">
          Smart Vehicle Management Platform
        </p>

        <h2 className="text-text text-2xl font-semibold mt-10 mb-6">
          Welcome Back 👋
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-primary hover:bg-primary-hover text-background font-bold uppercase tracking-wider rounded-xl py-3 transition-all duration-300 shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-text-secondary text-center mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-hover font-semibold transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;