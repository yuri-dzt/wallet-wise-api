import { z } from "zod";

export const deleteAdminSchema = z.object({
  admin_id: z.string().min(1, "Campo obrigatório"),
  id_to_delete: z.string().min(1, "Campo obrigatório"),
});

export type DeleteAdminRequestBody = z.infer<typeof deleteAdminSchema>;