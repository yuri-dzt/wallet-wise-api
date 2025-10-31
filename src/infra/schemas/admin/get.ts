import { z } from "zod";

export const getAdminsSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  created_at: z.number().optional(),
  permission: z.number().optional(),
});

export type GetAdminsRequestBody = z.infer<typeof getAdminsSchema>;