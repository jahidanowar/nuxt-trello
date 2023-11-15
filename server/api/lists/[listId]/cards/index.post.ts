import { Validator } from "#nuxt-server-utils";
import CardSchema from "~/schemas/Card.schema";
import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.user;
  const listId = getRouterParam(event, "listId");

  Validator.validateSchema(CardSchema, body);

  const card = await Card.create({
    ...body,
    list: listId,
    owner: user._id,
  });

  // Save the card to the list
  await List.findByIdAndUpdate(listId, {
    // To the front of the list
    $push: { cards: { $each: [card._id], $position: 0 } },
  });

  event.node.res.statusCode = 201;

  return card;
});
