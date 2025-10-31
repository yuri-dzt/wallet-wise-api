import { z } from "zod";

export const createFirstAdminSchema = z.object({
  id: z.string().optional(),
  secret_key: z.string().min(1, "Campo obrigatório"),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
  permission: z.number('Admin precisa de uma permissão'),
  created_at: z.number().optional(),
  updated_at: z.number().optional()
});

export type CreateFirstAdminRequestBody = z.infer<typeof createFirstAdminSchema>;