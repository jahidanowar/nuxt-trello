import { z, useValidatedBody } from "h3-zod";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await useValidatedBody(
    // @ts-expect-error
    event,
    z
      .object({
        name: z.string().min(3).max(255),
        email: z.string().email(),
        password: z.string().min(6).max(255),
        passwordConfirm: z.string().min(6).max(255),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      })
  );

  const user = await User.create({ name, email, password });

  return user;
});
