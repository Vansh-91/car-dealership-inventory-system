import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-text p-10">
      <h1 className="text-4xl font-bold">
        Welcome {user?.name}
      </h1>

      <p className="text-text-secondary mt-3">
        Car Dealership Inventory Dashboard
      </p>
    </div>
  );
};

export default Dashboard;