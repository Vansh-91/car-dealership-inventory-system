import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(2),
  model: z.string().min(1),
  category: z.string().min(2),
  price: z.number().positive(),
  quantity: z.number().min(0),
});