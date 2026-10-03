'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import { useOrganization, useSignIn, useSignUp } from '@clerk/nextjs'

export default function AcceptInvitationPage() {
  const router = useRouter()
  const { signUp } = useSignUp()
  const { signIn } = useSignIn()
  const { organization } = useOrganization()

  const token = useSearchParams().get('__clerk_ticket')
  const accountStatus = useSearchParams().get('__clerk_status')

  if (accountStatus === 'sign_in' && organization) {
    return router.push('/ask')
  }

  if (!token) {
    return (
      <div className={cn('flex items-center justify-center h-screen w-full')}>
        <p>No invitation token found.</p>
      </div>
    )
  }

  // Handle Invitation
  useEffect(() => {
    const completeInvitation = async () => {
      if (accountStatus === 'sign_up') {
        const { error } = await signUp.create({
          strategy: 'ticket',
          ticket: token,
        })

        if (error) {
          console.error('Error:', JSON.stringify(error, null, 2))
          return
        }

        if (signUp.status === 'complete') {
          await signUp.finalize({
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask)
                return
              }

              const url = decorateUrl('/ask')
              if (url.startsWith('http')) {
                window.location.href = url
              } else {
                router.push(url)
              }
            },
          })
        } else {
          console.error(JSON.stringify(signIn, null, 2))
        }
      } else if (accountStatus === 'sign_in') {
        const { error } = await signIn.create({ ticket: token })
        if (error) {
          console.error('Error:', JSON.stringify(error, null, 2))
          return
        }

        if (signIn.status === 'complete') {
          await signIn.finalize({
            navigate: ({ session, decorateUrl }) => {
              if (session?.currentTask) {
                console.log(session?.currentTask)
                return
              }

              const url = decorateUrl('/ask')
              if (url.startsWith('http')) {
                window.location.href = url
              } else {
                router.push(url)
              }
            },
          })
        } else {
          console.error(JSON.stringify(signIn, null, 2))
        }
      }
    }

    completeInvitation()
  }, [signIn, token, organization, accountStatus])

  if (
    (accountStatus === 'sign_in' || accountStatus === 'sign_up') &&
    !organization
  ) {
    return (
      <div className={cn('flex items-center justify-center h-screen w-full')}>
        <Spinner />
      </div>
    )
  }

  return <div id="clerk-captcha" />
}
