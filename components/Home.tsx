'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Sidebar from '@/components/Sidebar'
import productsData from '@/lib/products.json'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
}

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [isInitialized, setIsInitialized] = useState(false)


  const handleClearFilters = () => {
    // reset state
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, maxPrice])
  
    // remove ALL query params
    router.replace(window.location.pathname, { scroll: false })
  }  
  
  useEffect(() => {
    if (!isInitialized) {
      const search = searchParams.get('search') || ''
      const category = searchParams.get('category')?.split(',').filter(Boolean) || []
      const brand = searchParams.get('brand')?.split(',').filter(Boolean) || []
      const priceParam = searchParams.get('price')
      let price: [number, number] = [0, 10000]
      if (priceParam) {
        const [min, max] = priceParam.split('-').map(Number)
        if (!isNaN(min) && !isNaN(max)) {
          price = [min, max]
        }
      }

      setSearchQuery(search)
      setSelectedCategories(category)
      setSelectedBrands(brand)
      setPriceRange(price)
      setIsInitialized(true)
    }
  }, [searchParams, isInitialized])

  useEffect(() => {
    const search = searchParams.get('search') || ''
    setSearchQuery(search)
  }, [searchParams])

  const products: Product[] = productsData.products

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)))
    return cats.sort()
  }, [products])

  const brands = useMemo(() => {
    const brs = Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b))))
    return brs.sort()
  }, [products])

  const maxPrice = useMemo(() => {
    const max = Math.max(...products.map((p) => p.price), 0)
    return max > 0 ? Math.ceil(max) : 10000
  }, [products])

  useEffect(() => {
    if (maxPrice > 0 && priceRange[1] === 10000 && !isInitialized) {
      setPriceRange([0, maxPrice] as [number, number])
    }
  }, [maxPrice, isInitialized, priceRange])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      )
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        product.brand && selectedBrands.includes(product.brand)
      )
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    return filtered
  }, [products, searchQuery, selectedCategories, selectedBrands, priceRange])

  useEffect(() => {
    if (!isInitialized) return

    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategories.length > 0)
      params.set('category', selectedCategories.join(','))
    if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','))
    if (priceRange[0] !== 0 || priceRange[1] !== maxPrice)
      params.set('price', `${priceRange[0]}-${priceRange[1]}`)

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, router, maxPrice, isInitialized])

  const isFilterApplied =
  !!searchQuery ||
  selectedCategories.length > 0 ||
  selectedBrands.length > 0 ||
  priceRange[0] !== 0 ||
  priceRange[1] !== maxPrice

  return (

    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-80 flex-shrink-0">
          <Sidebar
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={setSelectedCategories}
            onBrandChange={setSelectedBrands}
            onPriceRangeChange={setPriceRange}
          />
        </aside>

        <div className="flex-1">
          <div className='flex items-center justify-between'>

          <h1 className="text-2xl font-bold text-primary-dark mb-6">
            Product Listing
          </h1>
         {
          isFilterApplied&&

         <Button onClick={handleClearFilters} variant={'outline'} className='text-black'>
            Clear filter <X/>
          </Button>
         } 
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.thumbnail || product.images[0] || ''}
                  rating={product.rating}
                  description={product.description}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
