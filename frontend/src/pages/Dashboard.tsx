import { useEffect, useState } from "react";
import { FaCar, FaWarehouse, FaDollarSign } from "react-icons/fa";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import AddVehicleModal from "../components/AddVehicleModal";
import toast from "react-hot-toast";
import { deleteVehicle,restockVehicle} from "../services/vehicleService";
interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

const Dashboard = () => {

    console.log("Dashboard Rendered");
    const [editingVehicle, setEditingVehicle] =
  useState<Vehicle | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const handleRestock = async (id: string) => {
  const qty = window.prompt("Quantity to restock");

  if (!qty) return;

  try {
    await restockVehicle(id, Number(qty));

    toast.success("Vehicle Restocked");

    fetchVehicles();
  } catch {
    toast.error("Restock Failed");
  }
};
const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this vehicle?"
  );

  if (!confirmDelete) return;

  try {
    await deleteVehicle(id);

    toast.success("Vehicle deleted successfully!");

    setVehicles((prev) =>
      prev.filter((vehicle) => vehicle._id !== id)
    );
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Delete failed."
    );
  }
};
const fetchVehicles = async () => {
  try {
    const res = await api.get("/vehicles/search", {
      params: {
        search,
        category,
        minPrice,
        maxPrice,
      },
    });

    setVehicles(res.data.vehicles);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchVehicles();
}, [search, category, minPrice, maxPrice]);
const handlePurchase = (updatedVehicle: Vehicle) => {
  setVehicles((prev) =>
    prev.map((vehicle) =>
      vehicle._id === updatedVehicle._id
        ? updatedVehicle
        : vehicle
    )
  );
};
  const totalVehicles = vehicles.length;

  const totalStock = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.quantity,
    0
  );

  const inventoryValue = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
    0
  );

 return (
  <div className="min-h-screen bg-background text-text p-8">

    <Navbar />

   <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">
    Dashboard
  </h1>

  {user?.role === "admin" && (
    <button
  onClick={() => setShowAddModal(true)}
  className="bg-primary hover:bg-primary-hover text-background px-6 py-3 rounded-xl font-bold transition"
>
  + Add Vehicle
</button>
  )}

</div>

    {/* Search Bar */}
    <SearchBar
      search={search}
      setSearch={setSearch}
    />
<Filters
  category={category}
  setCategory={setCategory}
  minPrice={minPrice}
  setMinPrice={setMinPrice}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
/>
    {/* Statistics */}
    <div className="grid md:grid-cols-3 gap-6 mb-10">

      <div className="bg-card rounded-3xl border border-border p-6">
        ...
      </div>

      <div className="bg-card rounded-3xl border border-border p-6">
        ...
      </div>

      <div className="bg-card rounded-3xl border border-border p-6">
        ...
      </div>

    </div>

    {/* Vehicle Cards */}
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
     {vehicles.map((vehicle) => (
  <VehicleCard
  key={vehicle._id}
  vehicle={vehicle}
  onPurchase={handlePurchase}
  onEdit={() => setEditingVehicle(vehicle)}
  onDelete={handleDelete}
  onRestock={handleRestock}
/>
))}
    </div>
<AddVehicleModal
  open={showAddModal || editingVehicle !== null}
  onClose={() => {
    setShowAddModal(false);
    setEditingVehicle(null);
  }}
  onSuccess={() => {
    fetchVehicles();
    setEditingVehicle(null);
  }}
  editId={editingVehicle?._id}
  initialData={
    editingVehicle
      ? {
          make: editingVehicle.make,
          model: editingVehicle.model,
          category: editingVehicle.category,
          price: editingVehicle.price,
          quantity: editingVehicle.quantity,
        }
      : undefined
  }
/>
  </div>
);
};

export default Dashboard;