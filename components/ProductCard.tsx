'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  id: number
  title: string
  price: number
  image: string
  rating?: number
  description?: string
  category?: string
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  rating,
  description,
  category,
}: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id,
      title,
      price,
      image: image || '/placeholder-product.jpg',
    })
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      )
    }
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-primary/50 text-primary"
        />
      )
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-primary/30" />
      )
    }

    return stars
  }

  return (
    <Link href={`/product/${id}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={image || '/placeholder-product.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-lg mb-3  line-clamp-2">{title}</h3>
          <div className='space-y-2'>

          {rating !== undefined && (
            <div className="flex items-center gap-1 ">
              {renderStars(rating)}
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground  line-clamp-2">
              {description}
            </p>
          )}
          {category && (
            <p className="text-sm text-muted-foreground/80  w-auto  capitalize">
              {category}
            </p>
          )}
                        </div>

          <div className="mt-auto pt-2">
            <p className="text-xl font-bold mb-3 text-black ">${price.toFixed(2)}</p>
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
