import { Hono } from 'hono'
import {mastra} from "./mastra/index"
import { clerkMiddleware, getAuth } from '@clerk/hono'
import { HonoBindings, HonoVariables, MastraServer } from '@mastra/hono'

const app = new Hono<{ Bindings: HonoBindings, Variables: HonoVariables }>()
const mastraServer = new MastraServer({ app, mastra })

await mastraServer.init()

const protectedRoute = new Hono()

protectedRoute.use("*", clerkMiddleware())

app.get("/health", (c) => {
  return c.text("healthy")
})

app.get("/", (c) => {
  return c.text('Hello Hono!')
})

app.route("/", protectedRoute)


export default {
  port: 8000,
  fetch: app.fetch,
}
