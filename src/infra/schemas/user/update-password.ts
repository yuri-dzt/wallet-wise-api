import { z } from "zod";

export const updateUserPasswordSchema = z.object({
  token: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
});

export type UpdateUserPasswordRequestBody = z.infer<typeof updateUserPasswordSchema>;