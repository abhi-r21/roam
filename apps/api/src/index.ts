import { Hono } from 'hono'
import { mastra } from "@/mastra"
import { cors } from "hono/cors";
import { organization, user } from '@/routes'
import { clerkMiddleware } from '@clerk/hono'
import { HonoBindings, HonoVariables, MastraServer } from '@mastra/hono'
import { authMiddleware } from './middleware'



const app = new Hono<{ Bindings: HonoBindings, Variables: HonoVariables }>().basePath("/api/v1")

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true,
  }),
)
// const mastraServer = new MastraServer({ app, mastra })

// await mastraServer.init()

const protectedRoute = new Hono()

protectedRoute.use("*", clerkMiddleware())
protectedRoute.use("*", authMiddleware)

app.get("/health", (c) => {
  return c.text("healthy")
})


protectedRoute.route("/user", user);
protectedRoute.route("/organization", organization);

app.route("/", protectedRoute);


export default {
  port: 8000,
  fetch: app.fetch,
}
