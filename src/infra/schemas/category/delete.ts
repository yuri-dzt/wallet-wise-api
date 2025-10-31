import { z } from "zod";

export const deleteCategorySchema = z.object({
  admin_id: z.string().min(1, "Campo obrigatório"),
  category_id: z.string().min(1, "Campo obrigatório"),
});

export type DeleteCategoryRequestBody = z.infer<typeof deleteCategorySchema>;