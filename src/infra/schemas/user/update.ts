import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.email('Email inválido').optional(),
});

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>;
