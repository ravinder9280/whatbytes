'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useCart } from '@/contexts/CartContext'

const Navbar = () => {
    const { getTotalItems } = useCart()
    const cartItemsCount = getTotalItems()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    useEffect(() => {
        setSearchQuery(searchParams.get('search') || '')
    }, [searchParams])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set('search', value)
        } else {
            params.delete('search')
        }
        router.push(`/?${params.toString()}`, { scroll: false })
    }

    return (
        <header className='fixed top-0 left-0 right-0 z-[3] transition-all duration-300 bg-primary'>
            <div className='w-full container mx-auto sm:px-6 md:px-12 lg:px-24 xl:px-0 px-4'>
                <div className='flex items-center h-16 justify-between gap-2'>

                    <Link href={'/'} className='text-foreground hidden  font-poppins font-bold md:text-xl md:flex items-center cursor-pointer'>
                        WhatBytes

                    </Link>

                    <div className='flex  items-center gap-4 max-w-2xl flex-1 justify-center'>


                        <div className='border  flex items-center rounded px-2 w-full max-w-md'>
                            <Search size={20} />
                            <Input
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className='placeholder:text-muted ring-transparent border-none bg-transparent focus-visible:bg-transparent'
                                placeholder='Search for products...'
                            />


                        </div>
                        <Link href={'/cart'} className='bg-primary-dark px-4 flex items-center h-[38px] rounded relative'>

                            <ShoppingCart className='size-4' strokeWidth={3} />
                            <span className='font-bold ml-1 hidden md:block text-sm'>

                                Cart
                            </span>
                            {cartItemsCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                                    {cartItemsCount}
                                </Badge>
                            )}

                        </Link>

                    </div>


                </div>

            </div>
        </header>

    )
}

export default Navbar