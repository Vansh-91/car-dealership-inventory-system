import { useEffect, useState } from "react";
import { FaCar, FaWarehouse, FaDollarSign } from "react-icons/fa";
import api from "../services/api";
import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => {
    console.log("useEffect running");
    const fetchVehicles = async () => {
        
        console.log("Fetching vehicles...");
      try {

       const res = await api.get("/vehicles/search", {
  params: {
  search,
  category,
  minPrice,
  maxPrice,
}
});
console.log(res.data);
        setVehicles(res.data.vehicles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVehicles();
  }, [search, category, minPrice, maxPrice]);

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

    <h1 className="text-4xl font-bold mb-8">
      Dashboard
    </h1>

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
        />
      ))}
    </div>

  </div>
);
};

export default Dashboard;