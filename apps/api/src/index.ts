import { Hono } from 'hono'
import auth from "./routes/auth";
import user from "./routes/user";
import { cors } from 'hono/cors';
import { Bindings } from "@workspace/types"
import { MastraServer, HonoBindings, HonoVariables } from "@mastra/hono";
import { mastra } from "./mastra/index.js"


const app = new Hono<{ Bindings: HonoBindings, Variables: HonoVariables }>({ strict: false });

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposeHeaders: ["Set-Cookie"],
    credentials: true,
  }),
);

const server = new MastraServer({ app, mastra });

app.get('/early-health', c => c.json({ status: 'ok' }))

await server.init()

// After init - has access to Mastra context
app.get('/custom', c => {
  const mastraInstance = c.get('mastra')
  return c.json({ agents: Object.keys(mastraInstance.listAgents()) })
})



// app.get('/api/v1', (c) => {
//   return c.text("Healthy")
// });

// const api = app.basePath("/api/v1");
// api.route("/auth", auth)
// api.route("/user", user);

export default {
  fetch: app.fetch,
  port: 8787
}
