import { z } from "zod";

export const activeAccountSchema = z.object({
  email: z.email('Email inválido'),
});

export type ActiveAccountRequestBody = z.infer<typeof activeAccountSchema>;