import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Proszę podać prawidłowy adres e-mail",
  }),
  password: z.string().min(8, {
    message: "Hasło musi zawierać co najmniej 8 znaków",
  }),
});

export type LoginValues = z.infer<typeof loginSchema>;
