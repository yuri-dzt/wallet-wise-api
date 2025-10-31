import { z } from "zod";

export const getUsersSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  created_at: z.number().optional(),
});

export type GetUsersRequestBody = z.infer<typeof getUsersSchema>;