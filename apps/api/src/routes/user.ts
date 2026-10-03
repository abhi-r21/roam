import { Hono } from "hono";
import { getAuth } from "@clerk/hono";

const userRouter = new Hono();

userRouter.patch("/update", async (c) => {
  const clerkClient = c.get("clerk");
});

export { userRouter };
