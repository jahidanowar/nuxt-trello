import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const cardId = getRouterParam(event, "cardId");
  const user = event.context.user;

  const card = await Card.findOneAndDelete({
    _id: cardId,
    list: listId,
    owner: user._id,
  });

  if (!card) {
    throw createError({
      statusCode: 404,
      message: "Card not found",
    });
  }

  // Remove the card from the list
  await List.findByIdAndUpdate(listId, {
    $pull: { cards: card._id },
  });

  event.node.res.statusCode = 204;

  return true;
});
