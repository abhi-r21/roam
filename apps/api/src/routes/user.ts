import { Hono } from 'hono'
import { STATUS } from '@/utils/status-codes'

const user = new Hono()

user.patch('/update', async c => {
  const clerkClient = c.get('clerk')
})

user.post('/invite', async c => {
  const auth = c.get('clerkAuth')
  const { has, orgId, userId } = auth()

  const clerkClient = c.get('clerk')

  let { invitations } = await c.req.json()

  // only admin can send invitations for an org right.

  try {
    if (!orgId) {
      return c.json({ message: 'No active organization' }, STATUS.NOT_FOUND)
    }

    if (!invitations) {
      return c.json(
        { message: 'No invitations provided' },
        STATUS.UNPROCESSABLE_ENTITY
      )
    }

    const isAdmin = has({ role: 'org:admin' })

    if (!isAdmin) {
      return c.json({ message: 'Invalid Access' }, STATUS.FORBIDDEN)
    }

    invitations = invitations.map(
      (i: { role: string; inviterUserId: string; emailAddress: string }) => ({
        inviterUserId: userId,
        emailAddress: i.emailAddress,
        role: `org:${i.role}`,
        redirectUrl: 'http://localhost:3000/accept-invitation',
      })
    )

    const { data } =
      await clerkClient.organizations.createOrganizationInvitationBulk(
        orgId,
        invitations
      )

    return c.json(
      {
        message: `Successfully sent ${
          invitations.length > 1 ? 'invitations' : 'invitation'
        }`,
      },
      STATUS.OK
    )
  } catch (error) {
    console.log(error)
    return c.json(
      { message: 'Something went wrong' },
      STATUS.INTERNAL_SERVER_ERROR
    )
  }
})

export { user }
