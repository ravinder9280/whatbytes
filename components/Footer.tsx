import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-primary-dark text-white'>
            <div className='container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <h4 className='text-xl font-semibold mb-4'>
                        Filters
                    </h4>
                    <div className='space-y-2'>
                        <Link href='/?category=' className='block text-sm hover:text-primary/80'>
                            All
                        </Link>
                        <Link href='/?category=electronics' className='block text-sm hover:text-primary/80'>
                            Electronics
                        </Link>
                        <Link href='/?category=clothing' className='block text-sm hover:text-primary/80'>
                            Clothing
                        </Link>
                        <Link href='/?category=home' className='block text-sm hover:text-primary/80'>
                            Home
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className='text-xl font-semibold mb-4'>
                        About Us
                    </h4>
                    <div className='space-y-2'>
                        <Link href='#' className='block text-sm hover:text-primary/80'>
                            About Us
                        </Link>
                        <Link href='#' className='block text-sm hover:text-primary/80'>
                            Contact
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className='text-xl font-semibold mb-4'>
                        Follow Us
                    </h4>
                    <div className='flex items-center gap-4'>
                        <Link href='#' className='bg-primary/20 p-2 rounded-full hover:bg-primary/30 transition-colors'>
                            <Facebook size={18} className='text-white' />
                        </Link>
                        <Link href='#' className='bg-primary/20 p-2 rounded-full hover:bg-primary/30 transition-colors'>
                            <Twitter size={18} className='text-white' />
                        </Link>
                        <Link href='#' className='bg-primary/20 p-2 rounded-full hover:bg-primary/30 transition-colors'>
                            <Instagram size={18} className='text-white' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='border-t border-primary/20 py-4'>
                <div className='container mx-auto px-4 text-center text-sm text-white/80'>
                    © 2025 WhatBytes. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer