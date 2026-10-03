'use client'

import { Monitor } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function Security() {
  return (
    <main className="flex flex-col w-full h-full">
      <div className="py-2.5 max-w-7xl mx-auto">
        <h1 className="tracking-normal mx-auto">Security</h1>
      </div>
      <Separator />
      {/* Main Area */}
      <div className="overflow-scroll flex-1 flex flex-col items-center w-full pt-10 gap-16 max-w-7xl mx-auto">
        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            password
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm tracking-tight">***************</p>
            <Button size={'xs'} variant={'outline'}>
              Update
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            passkeys
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm tracking-tight">
              Add a passkey to sign in without entering a password.
            </p>
            <Button size={'xs'} variant={'outline'}>
              + Add passkey
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            two-step verification
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm tracking-tight">
              Add an extra layer of security to your account.
            </p>
            <Button size={'xs'} variant={'outline'}>
              + Add two-step
            </Button>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            active devices
          </h2>
          <div className="w-full flex items-start justify-between mt-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Monitor size={16} />
                <p className="text-sm">Windows</p>

                <span className="text-xs px-2 py-0.5 rounded-md bg-muted">
                  This device
                </span>
              </div>

              <p className="text-sm text-muted-foreground">Firefox 156.0</p>

              <p className="text-sm text-muted-foreground">Chennai, India</p>

              <p className="text-sm text-muted-foreground">Today at 12:02 PM</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xs uppercase font-medium tracking-normal mb-3 text-muted-foreground">
            delete account
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-sm tracking-tight">
              Permanently delete your account and all associated data.
            </p>
            <Button size={'xs'} variant={'destructive'} className="">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
