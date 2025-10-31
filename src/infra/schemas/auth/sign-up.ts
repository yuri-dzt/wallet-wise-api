import { z } from "zod";

export const signUpSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
  token: z.string().optional(),
  active: z.boolean().optional(),
  created_at: z.number().optional(),
  updated_at: z.number().optional()
});

export type SignUpRequestBody = z.infer<typeof signUpSchema>;