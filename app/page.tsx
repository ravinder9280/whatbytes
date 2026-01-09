import Home from '@/components/Home'
import { ListSkeleton } from '@/components/ListSkeleton'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Home />

    </Suspense>
  )
}

export default page