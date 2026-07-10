"use client"

import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <h1 className="text-xl font-light text-foreground">Something went wrong</h1>
      <p className="max-w-sm text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  )
}
