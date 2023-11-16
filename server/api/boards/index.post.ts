import { Validator } from "#nuxt-server-utils";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board";
import type { UserDocument } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  Validator.validateSchema(BoardSchema, body);

  const user = event.context.user as UserDocument;

  const boardCount = await Board.countDocuments({ owner: user._id });

  if (boardCount >= 1 && !user.hasActiveSubscription) {
    throw createError({
      statusCode: 403,
      message:
        "You can't create more than 1 boards in free plan. Please upgrade your plan to create unlimited",
    });
  }

  const board = await Board.create({
    ...body,
    owner: user._id,
  });

  return board;
});
