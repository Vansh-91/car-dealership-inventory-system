import api from "./api";

export const purchaseVehicle = async (id: string) => {
  const response = await api.post(`/vehicles/${id}/purchase`);
  return response.data;
};