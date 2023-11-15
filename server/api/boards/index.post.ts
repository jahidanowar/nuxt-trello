import { Validator } from "#nuxt-server-utils";
import { getServerSession } from "#auth";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  Validator.validateSchema(BoardSchema, body);

  const user = await event.context.user;

  const board = await Board.create({
    ...body,
    owner: user._id,
  });

  return board;
});
