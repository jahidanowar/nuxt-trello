import { Validator } from "#nuxt-server-utils";
import { getServerSession } from "#auth";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  Validator.validateSchema(BoardSchema, body);

  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const board = await Board.create({
    ...body,
    owner: (session.user as any)._id,
  });

  return board;
});
