import { ResourceHelper } from "#nuxt-server-utils";
import { Board } from "~/server/models/Board";

export default defineEventHandler(
  ResourceHelper.index({
    model: Board,
  })
);
