import { Board } from "~/server/models/Board";
import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user;

  const list = await List.findOneAndDelete({
    _id: listId,
    owner: user._id,
  });

  if (!list) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    });
  }

  // Remove the list from the board
  await Board.findByIdAndUpdate(list.board, {
    $pull: { lists: list._id },
  });

  // Remove the cards from the list
  await Card.deleteMany({
    list: list._id,
  });

  event.node.res.statusCode = 204;

  return true;
});
