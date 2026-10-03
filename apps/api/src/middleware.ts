import { getAuth } from '@clerk/hono'
import { STATUS } from '@/utils/status-codes'
import { createMiddleware } from 'hono/factory'

const authMiddleware = createMiddleware(async (c, next) => {
  const { isAuthenticated } = getAuth(c)

  if (!isAuthenticated) {
    return c.json({ message: 'Unauthorized' }, STATUS.UNAUTHORIZED)
  }

  await next()
})

export { authMiddleware }
