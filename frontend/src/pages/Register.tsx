import { Link, useNavigate } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { registerSchema } from "../schemas/authSchema";
import { registerUser } from "../services/authService";

import type { RegisterData } from "../types/auth";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);

      toast.success("Account created successfully!");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[180px] rounded-full"></div>

      <div className="relative w-full max-w-md bg-card/90 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center">
          <div className="bg-primary p-5 rounded-full">
            <FaCarSide className="text-background text-4xl" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-text mt-6">
          Velocity Inventory
        </h1>

        <p className="text-center text-text-secondary mt-2">
          Create your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:ring-2 focus:ring-primary outline-none"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:ring-2 focus:ring-primary outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text focus:ring-2 focus:ring-primary outline-none"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-background font-bold rounded-xl py-3 transition disabled:opacity-50"
          >
            {isSubmitting
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-8">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;