import { z } from "zod";

export const updateCategorySchema = z.object({
  id: z.string().min(1, "Campo obrigatório"),
  admin_id: z.string().min(1, "Campo obrigatório"),
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateCategoryRequestBody = z.infer<typeof updateCategorySchema>;