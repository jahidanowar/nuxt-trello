import SignupSchema from "~/schemas/Signup.schema";
import { User } from "~/server/models/User";

import { Validator } from "#nuxt-server-utils";
import { Board } from "~/server/models/Board";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  Validator.validateSchema(SignupSchema, data);
  const user = await User.create(data);

  // Create a board for the user
  const board = await Board.create({
    name: "Main Board",
    owner: user._id,
    coverImage: "https://picsum.photos/seed/picsum/1200/800",
  });

  const list = await List.create({
    name: "To Do",
    board: board._id,
    owner: user._id,
  });

  board.lists.push(list._id);

  await board.save();

  console.log({ board });

  return user;
});
