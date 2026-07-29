import Vehicle from "../models/Vehicle";

export interface CreateVehicleDTO {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

class VehicleService {
  async createVehicle(data: CreateVehicleDTO) {
    const vehicle = await Vehicle.create(data);
    return vehicle;
  }
  async getAllVehicles() {
  return await Vehicle.find();
}
}

export default new VehicleService();