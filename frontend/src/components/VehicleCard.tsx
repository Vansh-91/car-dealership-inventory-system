import { FaCarSide } from "react-icons/fa";
import toast from "react-hot-toast";
import { purchaseVehicle } from "../services/inventoryService";
import { useAuth } from "../context/AuthContext";
interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

interface Props {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const VehicleCard = ({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
}: Props) => {
    const {user}=useAuth();
  const handlePurchase = async () => {
    try {
      const response = await purchaseVehicle(vehicle._id);

      toast.success("Vehicle purchased successfully!");

      onPurchase(response.vehicle);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Purchase failed."
      );
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-border p-6 hover:border-primary transition-all hover:scale-[1.02]">

      <div className="bg-surface w-16 h-16 rounded-2xl flex items-center justify-center mb-5">
        <FaCarSide className="text-primary text-3xl" />
      </div>

      <h2 className="text-2xl font-bold text-text">
        {vehicle.make}
      </h2>

      <p className="text-text-secondary">
        {vehicle.model}
      </p>

      <div className="mt-5 space-y-2">

        <div className="flex justify-between">
          <span className="text-text-secondary">Category</span>
          <span>{vehicle.category}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Price</span>
          <span>${vehicle.price.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-text-secondary">Stock</span>

          <span
            className={
              vehicle.quantity > 0
                ? "text-primary font-bold"
                : "text-red-500 font-bold"
            }
          >
            {vehicle.quantity}
          </span>
        </div>

      </div>
<div className="mt-6 space-y-3">

  <button
    onClick={handlePurchase}
    disabled={vehicle.quantity === 0}
    className="w-full bg-primary hover:bg-primary-hover disabled:bg-gray-700 disabled:text-gray-400 transition py-3 rounded-xl text-background font-bold"
  >
    {vehicle.quantity > 0
      ? "Purchase"
      : "Out of Stock"}
  </button>

  {user?.role === "admin" && (

    <div className="grid grid-cols-2 gap-3">

      <button
        onClick={onEdit}
        className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(vehicle._id)}
        className="bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold transition"
      >
        Delete
      </button>

    </div>

  )}

</div>

    </div>
  );
};

export default VehicleCard;