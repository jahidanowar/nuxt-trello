import { Validator } from "#nuxt-server-utils";
import { z } from "h3-zod";
import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.user;
  const listId = getRouterParam(event, "listId");
  const cardId = getRouterParam(event, "cardId");

  Validator.validateSchema(
    z.object({
      newListId: z.string(),
      newListCards: z.array(z.string()),
    }),
    body
  );

  await Promise.all([
    // Remove the card from the current list
    List.findOneAndUpdate(
      {
        owner: user._id,
        _id: listId,
      },
      {
        $pull: {
          cards: cardId,
        },
      }
    ),

    // Save new list
    List.findOneAndUpdate(
      {
        owner: user._id,
        _id: body.newListId,
      },
      {
        $set: {
          cards: body.newListCards,
        },
      }
    ),

    // Save the new list id to the card
    Card.findByIdAndUpdate(cardId, {
      $set: {
        list: body.newListId,
      },
    }),
  ]);

  return true;
});
