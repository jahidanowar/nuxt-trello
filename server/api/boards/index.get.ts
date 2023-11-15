import { Board } from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  const boards = await Board.find({ owner: user._id }).sort({ createdAt: -1 });

  return boards;
});
