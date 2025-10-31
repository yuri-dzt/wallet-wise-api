import { z } from "zod";

export const deleteUserSchema = z.object({
  admin_id: z.string().min(1, "Campo obrigatório"),
  id_to_delete: z.string().min(1, "Campo obrigatório"),
});

export type DeleteUserRequestBody = z.infer<typeof deleteUserSchema>;