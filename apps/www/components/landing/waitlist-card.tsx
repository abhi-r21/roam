'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'

export function WaitlistCard() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'already' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit() {
    if (!email.trim()) return

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      setStatus('error')
      setErrorMessage('Enter a valid email and try again.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data?.error || 'Something went wrong. Try again.')
        return
      }

      if (data?.alreadyJoined) {
        setStatus('already')
        return
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMessage("Couldn't reach the server. Try again.")
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="mx-auto w-full max-w-120 overflow-hidden rounded-[32px] bg-white p-1.5 border">
      {/* Image / hero */}
      <div className="relative h-70 w-full overflow-hidden rounded-[26px] flex items-center justify-center">
        <Image
          src="/warmmy-2.png"
          alt="Yuvly"
          fill
          sizes="(min-width: 480px) 480px, 100vw"
          className="object-cover"
          loading="eager"
        />
        <div className={cn('relative z-10 flex items-center')}>
          <Image
            src={'/yuvly_new.svg'}
            alt="logo"
            width={70}
            height={70}
            loading="eager"
          />
          <p className="font-sans text-4xl tracking-tighter font-medium text-black -ml-3.5">
            Yuvly
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-b-[26px] bg-white px-5 pb-5 pt-6">
        <h2 className="text-[16px] font-medium text-black tracking-tight">
          Welcome to Yuvly!
        </h2>
        <p className="mt-2 text-[14px] tracking-tight text-neutral-400">
          Yuvly is your AI travel buddy that plans, books, and looks out for
          you.
        </p>

        <div className="mt-8 flex items-center border rounded-lg px-3 py-0.5 bg-neutral-50">
          <Input
            placeholder="Join waitlist"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              if (status !== 'idle') {
                setStatus('idle')
                setErrorMessage('')
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={status === 'loading'}
            className={cn('border-none focus:ring-0! p-0 text-sm!')}
          />
          <span className="rounded-sm bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-700">
            {status === 'loading' ? (
              <Loader size={15} className="animate-spin " />
            ) : (
              '↵'
            )}
          </span>
        </div>

        {status === 'error' && (
          <p className="mt-2 text-xs text-red-500 ml-2">{errorMessage}</p>
        )}
        {status === 'already' && (
          <p className="mt-2 text-xs text-neutral-500 ml-2">
            You’re already on the list.
          </p>
        )}
        {status === 'success' && (
          <p className="mt-2 text-xs text-green-600 ml-2">
            You’re on the list!
          </p>
        )}
      </div>
    </div>
  )
}
