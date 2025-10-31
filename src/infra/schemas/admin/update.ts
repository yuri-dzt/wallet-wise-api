import { z } from "zod";

export const updateAdminSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
  email: z.email('Email inválido').optional(),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres').optional(),
  permission: z.number().optional(),
});

export type UpdateAdminRequestBody = z.infer<typeof updateAdminSchema>;