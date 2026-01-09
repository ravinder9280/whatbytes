'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import productsData from '@/lib/products.json'

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    rating: number
    brand?: string
    images: string[]
    thumbnail: string
    stock: number
    reviews?: Array<{
        rating: number
        comment: string
        date: string
        reviewerName: string
        reviewerEmail: string
    }>
}

export default function ProductPage() {
    const params = useParams()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const products: Product[] = productsData.products
    const productId = typeof params.id === 'string' ? parseInt(params.id) : params.id
    const product = products.find((p) => p.id === productId)

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            </div>
        )
    }

    const images = product.images && product.images.length > 0
        ? product.images
        : [product.thumbnail || '']

    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.thumbnail || product.images[0] || '',
            },
            quantity
        )
    }

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity)
        }
    }

    const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1
        if (value >= 1 && value <= product.stock) {
            setQuantity(value)
        }
    }

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            )
        }
        if (hasHalfStar) {
            stars.push(
                <Star
                    key="half"
                    className="w-5 h-5 fill-yellow-500/50 text-yellow-500"
                />
            )
        }
        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-500/30" />
            )
        }

        return stars
    }

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
                        {images.length > 0 && (
                            <>
                                <Image
                                    src={images[selectedImageIndex] || product.thumbnail || ''}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                   
                </div>

                <div className="space-y-6">
                    <div className='space-y-6'>
                        <h1 className="text-3xl font-bold text-primary-dark mb-2">
                            {product.title}
                        </h1>
                        <p className="text-4xl text-primary font-bold mb-2">
                            ${product.price.toFixed(2)}
                        </p>
                        <div>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                        {product.rating && (
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    ({product.rating.toFixed(1)})
                                </span>
                            </div>
                        )}
                        {product.brand && (
                            <p className="text-sm text-muted-foreground capitalize">
                                Brand: {product.brand}
                            </p>
                        )}
                    </div>


                    <div>

                        {product.stock > 0 ? (
                            <p className="text-sm text-green-600">In Stock ({product.stock} available)</p>
                        ) : (
                            <p className="text-sm text-red-600">Out of Stock</p>
                        )}
                    </div>




                    <div>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
                            {product.category}
                        </span>
                    </div>


                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="h-10 w-10 bg-muted text-black"
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={quantity}
                                    onChange={handleQuantityInput}
                                    className="w-20 h-10 text-center border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= product.stock}
                                    className="h-10 w-10 bg-muted text-black"
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full bg-green-500 hover:bg-green-500/90 text-white h-12 text-lg"
                            size="lg"
                        >
                            Add to Cart
                        </Button>
                    </div>

                    
                </div>
            </div>
            {product.reviews && product.reviews.length > 0 && (
                        <>
                            <div className='mt-6'>
                                <h2 className="text-lg text-black font-semibold mb-4">
                                    Reviews ({product.reviews.length})
                                </h2>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {product.reviews.map((review, index) => (
                                        <div key={index} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {review.reviewerName}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
        </div>
    )
}
