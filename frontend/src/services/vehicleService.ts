import api from "./api";

export const addVehicle = async (data: any) => {
  const response = await api.post("/vehicles", data);
  return response.data;
};

export const updateVehicle = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `/vehicles/${id}`,
    data
  );

  return response.data;
};

export const deleteVehicle = async (
  id: string
) => {
  const response = await api.delete(
    `/vehicles/${id}`
  );

  return response.data;
};
export const restockVehicle = async (
  id: string,
  quantity: number
) => {
  const response = await api.post(
    `/vehicles/${id}/restock`,
    { quantity }
  );

  return response.data;
};