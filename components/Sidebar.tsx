'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface FiltersProps {
  categories: string[]
  brands: string[]
  selectedCategories: string[]
  selectedBrands: string[]
  priceRange: [number, number]
  maxPrice: number
  onCategoryChange: (categories: string[]) => void
  onBrandChange: (brands: string[]) => void
  onPriceRangeChange: (range: [number, number]) => void
}

export default function Sidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  priceRange,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
}: FiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategories.length === 1 ? selectedCategories[0] : 'all'
  )

  useEffect(() => {
    setLocalPriceRange(priceRange)
  }, [priceRange])

  useEffect(() => {
    if (selectedCategories.length === 1) {
      setSelectedCategory(selectedCategories[0])
    } else {
      setSelectedCategory('all')
    }
  }, [selectedCategories])

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    if (value === 'all') {
      onCategoryChange([])
    } else {
      onCategoryChange([value])
    }
  }

  const handleBrandToggle = (brand: string) => {
    if (brand === 'all') {
      onBrandChange([])
    } else {
      const newBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
      onBrandChange(newBrands)
    }
  }

  const handlePriceSliderChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]]
    setLocalPriceRange(newRange)
    onPriceRangeChange(newRange)
  }

  return (
    <div className="bg-primary rounded-lg p-6 space-y-6">
      <h2 className=" font-bold text-xl mb-4">Filters</h2>

      {/* Category Filter */}
      <div>
        <label className=" font-bold text-xl mb-3 block">
          Category
        </label>
        <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="category-all" />
              <Label
                htmlFor="category-all"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                All
              </Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`category-${category}`} />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none cursor-pointer capitalize"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="  font-bold  mb-3 block">
          Price
        </label>
        <Slider
          value={[localPriceRange[0], localPriceRange[1]]}
          onValueChange={handlePriceSliderChange}
          min={0}
          max={maxPrice}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm  mt-2">
          <span>${localPriceRange[0]}</span>
          <span>${localPriceRange[1]}</span>
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div>
          <label className=" font-bold text-xl mb-3 block">
            Brands
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="brand-all"
                checked={selectedBrands.length === 0}
                onCheckedChange={() => handleBrandToggle('all')}
              />
              <label
                htmlFor="brand-all"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                All
              </label>
            </div>
            {brands.slice(0, 10).map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)

                  }
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
