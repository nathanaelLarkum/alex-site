import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Plain client for public, read-only data (no session/cookies involved).
// Keeps pages that only need public data statically renderable instead of
// forcing them into per-request dynamic rendering.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
