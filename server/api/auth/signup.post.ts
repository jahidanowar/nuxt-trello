import SignupSchema from "~/schemas/Signup.schema";
import { User } from "~/server/models/User";

import { Validator } from "#nuxt-server-utils";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  Validator.validateSchema(SignupSchema, data);
  const user = await User.create(data);
  return user;
});
