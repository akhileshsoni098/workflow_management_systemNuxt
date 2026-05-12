import { includes, z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),

  email: z.email(),

  password: z.string().min(6),

  role: z.enum(["Admin", "Manager", "Employee"]).default("Employee"),
});


