import { Validator } from "#nuxt-server-utils";
import ListSchema from "~/schemas/List.schema";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user;

  const body = await readBody(event);

  Validator.validateSchema(ListSchema.partial(), body);

  const updatedLists = await List.findOneAndUpdate(
    { _id: listId, owner: user._id },
    {
      $set: body,
    },
    {
      new: true,
    }
  );

  if (!updatedLists) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    });
  }

  return updatedLists;
});
