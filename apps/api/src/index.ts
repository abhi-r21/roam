import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

const app = new Hono()

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
