"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import type { AdminArtwork } from "@/lib/actions/artworks"
import { deleteArtworkImage } from "@/lib/actions/artworks"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ArtworkFormProps {
  action: (formData: FormData) => void
  initialData?: AdminArtwork
}

export function ArtworkForm({ action, initialData }: ArtworkFormProps) {
  const [titleEn, setTitleEn] = useState(initialData?.titleEn ?? "")
  const [titlePt, setTitlePt] = useState(initialData?.titlePt ?? "")
  const [descriptionEn, setDescriptionEn] = useState(initialData?.descriptionEn ?? "")
  const [descriptionPt, setDescriptionPt] = useState(initialData?.descriptionPt ?? "")
  const [size, setSize] = useState(initialData?.size ?? "")
  const [category, setCategory] = useState<"finished" | "unfinished">(
    initialData?.category ?? "finished"
  )
  const [price, setPrice] = useState(initialData?.price != null ? String(initialData.price) : "")
  const [newFileCount, setNewFileCount] = useState(0)
  const [existingImages, setExistingImages] = useState(initialData?.images ?? [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalImageCount = existingImages.length + newFileCount
  const canSubmit =
    titleEn.trim() !== "" &&
    titlePt.trim() !== "" &&
    descriptionEn.trim() !== "" &&
    descriptionPt.trim() !== "" &&
    size.trim() !== "" &&
    (category === "unfinished" || price.trim() !== "") &&
    totalImageCount > 0

  async function handleRemoveExistingImage(imageId: string, storagePath: string) {
    await deleteArtworkImage(imageId, storagePath)
    setExistingImages((current) => current.filter((image) => image.id !== imageId))
  }

  return (
    <form
      action={action}
      onSubmit={() => setIsSubmitting(true)}
      className="flex max-w-2xl flex-col gap-6"
    >
      <input type="hidden" name="existingImageCount" value={existingImages.length} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="titleEn">Title (English) *</Label>
          <Input
            id="titleEn"
            name="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="titlePt">Title (Portuguese) *</Label>
          <Input
            id="titlePt"
            name="titlePt"
            value={titlePt}
            onChange={(e) => setTitlePt(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="descriptionEn">Description (English) *</Label>
          <Textarea
            id="descriptionEn"
            name="descriptionEn"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            required
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="descriptionPt">Description (Portuguese) *</Label>
          <Textarea
            id="descriptionPt"
            name="descriptionPt"
            value={descriptionPt}
            onChange={(e) => setDescriptionPt(e.target.value)}
            required
            rows={4}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="size">Size *</Label>
          <Input
            id="size"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder='e.g. 24" x 36"'
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="category">Category *</Label>
          <Select
            name="category"
            value={category}
            onValueChange={(value) => setCategory(value as "finished" | "unfinished")}
            required
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="finished">Finished</SelectItem>
              <SelectItem value="unfinished">In progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {category === "finished" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price">Price (USD) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="images">Photos *</Label>

        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {existingImages.map((image) => (
              <div
                key={image.id}
                className="relative h-20 w-20 overflow-hidden rounded-md border border-border"
              >
                <Image src={image.url} alt="" fill className="object-cover" sizes="80px" />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(image.id, image.storagePath)}
                  className="absolute right-1 top-1 rounded-full bg-background/90 p-0.5 text-foreground"
                  aria-label="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setNewFileCount(e.target.files?.length ?? 0)}
        />
        <p className="text-xs text-muted-foreground">
          {totalImageCount} photo{totalImageCount === 1 ? "" : "s"} total — at least one required
        </p>
      </div>

      <Button type="submit" disabled={!canSubmit || isSubmitting} className="w-fit">
        {isSubmitting ? "Saving..." : initialData ? "Save changes" : "Add artwork"}
      </Button>
    </form>
  )
}
