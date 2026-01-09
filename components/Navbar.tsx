import Link from 'next/link'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-[3] transition-all duration-300 bg-primary'>
    <div className='w-full container mx-auto sm:px-6 md:px-12 lg:px-24 xl:px-0 px-4'>
        <div className='flex items-center h-16 justify-between gap-2'>

        <Link href={'/'} className='text-foreground font-poppins font-bold text-xl flex items-center cursor-pointer'>
                          WhatBytes
                          
                      </Link>

                      <div className='flex  items-center gap-4 max-w-2xl'>


                      <div className='border flex items-center rounded px-2  '>
                        <Search size={24}/>
                        <Input className='placeholder:text-muted ring-transparent border-none bg-transparent focus-visible:bg-transparent' placeholder='Search for products...'/>
    

                      </div>
                      <Link href={'/cart'} className='bg-primary-dark px-4 flex items-center h-[38px] rounded'>

                      <ShoppingCart className='size-4' strokeWidth={3}/>
                      <span className='font-bold ml-1 text-sm'>

                      Cart
                      </span>
                      
                      </Link>
            
                      </div>


                </div>
                    
            </div>
                </header>
                
                 )
}

export default Navbar