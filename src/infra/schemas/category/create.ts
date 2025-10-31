import { z } from "zod";

export const createCategorySchema = z.object({
  admin_id: z.string().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().optional(),
  created_at: z.number().optional(),
  updated_at: z.number().optional()
});

export type CreateCategoryRequestBody = z.infer<typeof createCategorySchema>;