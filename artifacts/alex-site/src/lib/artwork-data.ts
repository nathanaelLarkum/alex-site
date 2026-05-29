export interface Artwork {
  id: string
  title: string
  size: string
  description: string
  price: number
  imageUrl: string
  category: "finished" | "ongoing"
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Dawn",
    size: '24" x 36"',
    description:
      "An exploration of light and color capturing the fleeting moments of sunrise over a serene landscape. Mixed media on canvas featuring layered textures and luminous washes.",
    price: 2800,
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
    category: "finished",
  },
  {
    id: "2",
    title: "Urban Fragments",
    size: '30" x 40"',
    description:
      "A contemporary abstract piece reflecting the chaos and beauty of city life. Bold geometric shapes intersect with fluid organic forms.",
    price: 3500,
    imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80",
    category: "finished",
  },
  {
    id: "3",
    title: "Whispered Memories",
    size: '18" x 24"',
    description:
      "A delicate study in muted tones, this piece evokes nostalgia and quiet contemplation. Soft pastels blend seamlessly with charcoal undertones.",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80",
    category: "finished",
  },
  {
    id: "4",
    title: "Chromatic Tension",
    size: '36" x 48"',
    description:
      "A vibrant large-scale work exploring the dynamic relationship between complementary colors. This statement piece commands attention in any space.",
    price: 5200,
    imageUrl: "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?w=800&q=80",
    category: "finished",
  },
  {
    id: "5",
    title: "Solitude in Blue",
    size: '20" x 30"',
    description:
      "A meditative piece featuring various shades of blue, inspired by the tranquility of deep ocean waters. Oil on linen with subtle metallic accents.",
    price: 2400,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "ongoing",
  },
  {
    id: "6",
    title: "Golden Hour",
    size: '24" x 32"',
    description:
      "Capturing the warm embrace of late afternoon light, this piece celebrates the magic of the golden hour. Rich amber and ochre tones dance across the canvas.",
    price: 2900,
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
    category: "finished",
  },
  {
    id: "7",
    title: "Fractured Reality",
    size: '28" x 42"',
    description:
      "A surrealist composition challenging perceptions of space and form. Multiple perspectives converge in this thought-provoking work.",
    price: 4100,
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    category: "ongoing",
  },
  {
    id: "8",
    title: "Botanical Dreams",
    size: '16" x 20"',
    description:
      "An intimate study of flora rendered in exquisite detail. Watercolor and ink combine to create ethereal botanical illustrations.",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    category: "finished",
  },
  {
    id: "9",
    title: "Nocturne",
    size: '32" x 32"',
    description:
      "A moody exploration of nighttime atmospheres. Deep purples and blacks are punctuated by points of light, suggesting distant windows and stars.",
    price: 3200,
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
    category: "finished",
  },
  {
    id: "10",
    title: "Emerging Forms",
    size: '40" x 60"',
    description:
      "A monumental abstract work where shapes seem to emerge from and dissolve into the background. A meditation on presence and absence.",
    price: 7500,
    imageUrl: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&q=80",
    category: "ongoing",
  },
  {
    id: "11",
    title: "Terra Nova",
    size: '22" x 28"',
    description:
      "Earthy textures and natural pigments create a landscape of the imagination. Inspired by geological formations and the passage of time.",
    price: 2200,
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    category: "finished",
  },
  {
    id: "12",
    title: "Digital Horizons",
    size: '30" x 30"',
    description:
      "A contemporary piece bridging traditional painting techniques with digital aesthetics. Explores the intersection of technology and art.",
    price: 3800,
    imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80",
    category: "ongoing",
  },
]
