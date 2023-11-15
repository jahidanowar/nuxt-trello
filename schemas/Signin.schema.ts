import { z } from "h3-zod";

export default z.object({
  email: z
    .string({
      invalid_type_error: "Please enter a valid email address",
      required_error: "Please enter your email address",
    })
    .email(),
  password: z.string().min(8),
});
