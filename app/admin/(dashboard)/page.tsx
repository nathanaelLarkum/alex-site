import Link from "next/link"
import { getArtworks } from "@/lib/artworks"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteArtworkButton } from "@/components/admin/delete-artwork-button"

export default async function AdminDashboardPage() {
  const artworks = await getArtworks()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-light tracking-wide text-foreground">Artworks</h1>
        <Button asChild>
          <Link href="/admin/artworks/new">Add artwork</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title (EN)</TableHead>
            <TableHead>Title (PT)</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Photos</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artworks.map((artwork) => (
            <TableRow key={artwork.id}>
              <TableCell>{artwork.titleEn}</TableCell>
              <TableCell>{artwork.titlePt}</TableCell>
              <TableCell className="capitalize">{artwork.category}</TableCell>
              <TableCell>{artwork.price !== null ? `$${artwork.price.toLocaleString()}` : "—"}</TableCell>
              <TableCell>{artwork.images.length}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/artworks/${artwork.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteArtworkButton artworkId={artwork.id} title={artwork.titleEn} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {artworks.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          No artworks yet — click &ldquo;Add artwork&rdquo; to create the first one.
        </p>
      )}
    </div>
  )
}
