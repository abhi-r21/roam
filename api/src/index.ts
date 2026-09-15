import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

const app = new Hono()
app.use("*", clerkMiddleware())

app.get("/health", (c) => {
  return c.text("healthy")
})

app.get("/", (c) => {
  return c.text('Hello Hono!')
})

export default app
