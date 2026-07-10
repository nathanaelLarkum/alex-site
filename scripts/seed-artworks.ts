// One-off migration: uploads the Drive photo dump in public/PHOTOS SITE/
// into Supabase and creates one artworks row per folder. Run once with:
//   npx tsx scripts/seed-artworks.ts
// Safe to delete public/PHOTOS SITE/ locally afterwards (already gitignored).

process.loadEnvFile(".env.local")

import { createClient } from "@supabase/supabase-js"
import { readdirSync, readFileSync, statSync } from "fs"
import { join } from "path"
import sharp from "sharp"
import ws from "ws"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL!
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD!

const PHOTOS_ROOT = join(process.cwd(), "public", "PHOTOS SITE")
const MAX_DIMENSION = 2000
const JPEG_QUALITY = 80

interface SeedArtwork {
  titleEn: string
  titlePt: string
  descriptionEn: string
  descriptionPt: string
  size: string
  price: null
  category: "finished" | "unfinished"
  sortOrder: number
  images: string[]
}

function listImages(dir: string): string[] {
  return readdirSync(dir)
    .filter((name) => /\.jpe?g$/i.test(name))
    .sort()
    .map((name) => join(dir, name))
}

function collectFinished(): SeedArtwork[] {
  const root = join(PHOTOS_ROOT, "Finished")
  return readdirSync(root)
    .filter((name) => statSync(join(root, name)).isDirectory())
    .map((folderName) => {
      const match = folderName.match(/^(\d+)-\s*(.+)$/)
      const sortOrder = match ? parseInt(match[1], 10) : 0
      const titlePt = (match ? match[2] : folderName).trim()
      return {
        titleEn: `[Translate: ${titlePt}]`,
        titlePt,
        descriptionEn: "[PLACEHOLDER — description coming soon]",
        descriptionPt: "[SUBSTITUIR — descrição em breve]",
        size: "[PLACEHOLDER — size needed]",
        price: null,
        category: "finished" as const,
        sortOrder,
        images: listImages(join(root, folderName)),
      }
    })
}

function collectUnfinished(): SeedArtwork[] {
  const root = join(PHOTOS_ROOT, "Unfinished")
  return readdirSync(root)
    .filter((name) => statSync(join(root, name)).isDirectory())
    .map((folderName) => {
      const match = folderName.match(/^U(\d+)$/i)
      const n = match ? parseInt(match[1], 10) : 0
      return {
        titleEn: `Work in progress ${n}`,
        titlePt: `Obra em progresso ${n}`,
        descriptionEn: "This piece is still being worked on.",
        descriptionPt: "Esta obra ainda está a ser trabalhada.",
        size: "",
        price: null,
        category: "unfinished" as const,
        sortOrder: n,
        images: listImages(join(root, folderName)),
      }
    })
}

async function resizeToBuffer(filePath: string): Promise<Buffer> {
  return sharp(readFileSync(filePath))
    .rotate()
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY })
    .toBuffer()
}

async function main() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local")
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Missing SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local")
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    realtime: { transport: ws as never },
  })

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
  if (authError) throw authError

  const artworks = [...collectFinished(), ...collectUnfinished()]
  const totalPhotos = artworks.reduce((n, a) => n + a.images.length, 0)
  console.log(`Found ${artworks.length} artworks (${totalPhotos} photos) to migrate.`)

  for (const artwork of artworks) {
    const { data: row, error: insertError } = await supabase
      .from("artworks")
      .insert({
        title_en: artwork.titleEn,
        title_pt: artwork.titlePt,
        description_en: artwork.descriptionEn,
        description_pt: artwork.descriptionPt,
        size: artwork.size,
        price: artwork.price,
        category: artwork.category,
        sort_order: artwork.sortOrder,
      })
      .select()
      .single()

    if (insertError || !row) {
      console.error(`Failed to insert "${artwork.titlePt}":`, insertError)
      continue
    }

    console.log(`Inserted "${artwork.titlePt}" (${artwork.category}) — uploading ${artwork.images.length} photo(s)...`)

    for (const [index, filePath] of artwork.images.entries()) {
      const buffer = await resizeToBuffer(filePath)
      const storagePath = `${row.id}/${index}.jpg`

      const { error: uploadError } = await supabase.storage
        .from("artwork-images")
        .upload(storagePath, buffer, { contentType: "image/jpeg" })

      if (uploadError) {
        console.error(`  Failed to upload ${filePath}:`, uploadError)
        continue
      }

      const { error: imageInsertError } = await supabase.from("artwork_images").insert({
        artwork_id: row.id,
        storage_path: storagePath,
        sort_order: index,
        is_cover: index === 0,
      })

      if (imageInsertError) {
        console.error(`  Failed to record image ${storagePath}:`, imageInsertError)
      }
    }
  }

  console.log("Done.")
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
