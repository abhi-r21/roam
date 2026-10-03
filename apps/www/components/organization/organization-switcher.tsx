'use client'

import {
  OrganizationSwitcher as ClerkOrganizationSwitcher,
  useOrganizationList,
} from '@clerk/nextjs'
import { CreateOrganization } from './create-organization'

export function OrganizationSwitcher() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      pageSize: 5,
    },
  })

  if (userMemberships.data?.length === 0) {
    return <CreateOrganization />
  }

  return <ClerkOrganizationSwitcher />
}
