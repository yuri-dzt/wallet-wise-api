import { z } from "zod";

export const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
});

export type LoginRequestBody = z.infer<typeof loginSchema>;