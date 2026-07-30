import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
  addVehicle,
  updateVehicle,
} from "../services/vehicleService";

import { vehicleSchema } from "../schemas/vehicleSchema";

export interface VehicleForm {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;

  // Edit Mode
  editId?: string;
  initialData?: VehicleForm;
}

const AddVehicleModal = ({
  open,
  onClose,
  onSuccess,
  editId,
  initialData,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<VehicleForm>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (open) {
      reset(
        initialData ?? {
          make: "",
          model: "",
          category: "",
          price: 0,
          quantity: 0,
        }
      );
    }
  }, [open, initialData, reset]);

  const onSubmit = async (
    data: VehicleForm
  ) => {
    try {
      if (editId) {
        await updateVehicle(editId, data);

        toast.success(
          "Vehicle updated successfully!"
        );
      } else {
        await addVehicle(data);

        toast.success(
          "Vehicle added successfully!"
        );
      }

      onSuccess();

      onClose();

      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-card border border-border rounded-3xl w-full max-w-lg p-8">

        <h2 className="text-3xl font-bold mb-8">
          {editId
            ? "Edit Vehicle"
            : "Add Vehicle"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <div>
            <input
              placeholder="Make"
              {...register("make")}
              className="w-full bg-surface rounded-xl p-3 border border-border"
            />

            {errors.make && (
              <p className="text-red-500 text-sm mt-1">
                {errors.make.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Model"
              {...register("model")}
              className="w-full bg-surface rounded-xl p-3 border border-border"
            />

            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message}
              </p>
            )}
          </div>

          <div>
            <input
              placeholder="Category"
              {...register("category")}
              className="w-full bg-surface rounded-xl p-3 border border-border"
            />

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Price"
              {...register("price", {
                valueAsNumber: true,
              })}
              className="w-full bg-surface rounded-xl p-3 border border-border"
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantity"
              {...register("quantity", {
                valueAsNumber: true,
              })}
              className="w-full bg-surface rounded-xl p-3 border border-border"
            />

            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface border border-border rounded-xl py-3 hover:border-primary transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary-hover text-background rounded-xl py-3 font-bold transition"
            >
              {isSubmitting
                ? editId
                  ? "Updating..."
                  : "Adding..."
                : editId
                ? "Update Vehicle"
                : "Add Vehicle"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddVehicleModal;