import { HonoBindings, HonoVariables } from '@mastra/hono'
import { Hono } from 'hono'

const agentRouter = new Hono<{
  Bindings: HonoBindings
  Variables: HonoVariables
}>()

agentRouter.post('/ask', async c => {
  const {} = await c.req.json()

  const mastra = c.get('mastra')
  const roamAgent = mastra.getAgentById('roam-agent')
})
