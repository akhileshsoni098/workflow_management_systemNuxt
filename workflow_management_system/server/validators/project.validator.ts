import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3),

  description: z.string().optional(),

  assignedUsers: z.array(
    z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  ),
});
