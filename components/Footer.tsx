import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary-dark'>
        <div className='p-20 grid grid-cols-3 gap-40'>
            <div className='max-w-xl'>
                <p>

            © 2025 WhatBytes. All Rights Reserved.
                </p>

                <span className=''>
                    Privacy Policy
                </span>
            </div>

            <div>
                <h4 className='text-2xl'>
                    Company
                </h4>


                <div className='mt-4 space-y-2 '>
                    <p>

                About us
                    </p>
                    <p>

Services
                    </p>
                    <p>



Contact
                    </p>
                </div>



            </div>

            <div>
            <h4 className='text-2xl'>
                    Follow Us
                </h4>

                <div className='mt-4 flex items-center gap-5'>
          <Link href={'/'}  className='bg-muted/20 p-2 rounded-full'  >
            <Linkedin size={18}/>
          </Link >
          <Link  href={'/'}  className='bg-muted/20 p-2 rounded-full' >
            <Facebook size={18}/>
          </Link >
          <Link  href={'/'}  className='bg-muted/20 p-2 rounded-full' >
            <Twitter size={18}/>
          </Link >
         

          

                </div>

            </div>

        </div>
        


    </footer>
  )
}

export default Footer