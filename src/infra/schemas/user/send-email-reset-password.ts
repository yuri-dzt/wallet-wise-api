import { z } from "zod";

export const sendEmailResetPasswordSchema = z.object({
  token: z.string().min(1, "Campo obrigatório"),
  email: z.email('Email inválido'),
});

export type SendEmailResetPasswordRequestBody = z.infer<typeof sendEmailResetPasswordSchema>;