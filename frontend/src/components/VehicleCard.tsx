import { FaCarSide } from "react-icons/fa";

interface Props {
  vehicle: {
    _id: string;
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
  };
}

const VehicleCard = ({ vehicle }: Props) => {
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
              vehicle.quantity
                ? "text-primary font-bold"
                : "text-red-500 font-bold"
            }
          >
            {vehicle.quantity}
          </span>
        </div>

      </div>

      <button
        disabled={vehicle.quantity === 0}
        className="mt-6 w-full bg-primary disabled:bg-gray-700 disabled:text-gray-400 hover:bg-primary-hover transition py-3 rounded-xl text-background font-bold"
      >
        Purchase
      </button>

    </div>
  );
};

export default VehicleCard;