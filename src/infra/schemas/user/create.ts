import { z } from "zod";

export const createUserSchema = z.object({
  id: z.string().optional(),
  admin_id: z.string().min(1, "Campo obrigatório"),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
  created_at: z.number().optional(),
  updated_at: z.number().optional()
});

export type CreateUserRequestBody = z.infer<typeof createUserSchema>;