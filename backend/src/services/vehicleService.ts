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

  async searchVehicles(query: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const filter: any = {};

    if (query.make) {
      filter.make = new RegExp(query.make, "i");
    }

    if (query.model) {
      filter.model = new RegExp(query.model, "i");
    }

    if (query.category) {
      filter.category = new RegExp(query.category, "i");
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};

      if (query.minPrice) {
        filter.price.$gte = Number(query.minPrice);
      }

      if (query.maxPrice) {
        filter.price.$lte = Number(query.maxPrice);
      }
    }

    return await Vehicle.find(filter);
  }
}

export default new VehicleService();