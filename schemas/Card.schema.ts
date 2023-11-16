import { z } from "zod";

export default z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
  list: z.string(),
});
