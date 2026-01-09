'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const itemsTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryCharge = itemsTotal > 0 ? 18 : 0
  const grandTotal = itemsTotal + deliveryCharge

  const handleQuantityChange = (id: number, delta: number) => {
    const item = cart.find((item) => item.id === id)
    if (item) {
      const newQuantity = item.quantity + delta
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      } else {
        removeFromCart(id)
      }
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">YOUR CART</h1>
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">YOUR CART</h1>
          <div className="h-[1px] bg-border flex-1 max-w-md"></div>
        </div>
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-0">
          {cart.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center gap-4 py-4 border-b">
                <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border bg-gray-100">
                  <Image
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-black text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    ${item.price.toFixed(2)}
                  </p>

                </div>

                <div className="flex items-center gap-1 bg-primary rounded-full p-1">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="h-7 w-7   h flex items-center justify-center  font-bold transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-sm text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="h-7 w-7 flex items-center justify-center  font-bold transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="h-8 w-8 text-muted-foreground  ml-2 flex items-center justify-center transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border rounded-lg p-6">
            <h2 className="text-lg  mb-6 text-black">Bill details</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">items total</span>
                <span className="font-medium text-muted-foreground">${itemsTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">delivery charge</span>
                <span className="font-medium text-muted-foreground">${deliveryCharge.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-bold text-lg text-black">Grand total</span>
                <span className="font-bold text-lg text-black">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-green-500 hover:bg-green-500/90 text-white h-12"
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
