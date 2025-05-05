'use client'

import { useState, useEffect } from 'react'
import ProductGrid from '../components/ProductGrid'
import ProductFilters from '../components/ProductFilters'
import HeroSection from '../components/HeroSection'
import SortDropdown from '../components/SortDropdown'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    occasion: [],
    fabric: [],
    idealFor: [],
    work: [],
    segment: [],
    suitableFor: [],
    rawMaterials: [],
    pattern: [],
    availability: false,
    customizable: false
  })

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://fakestoreapi.com/products?limit=12', {
        // Add timeout to prevent long waiting times
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }
      
      let data = await response.json()
      
      // Add some demo properties for display purposes
      data = data.map((product, index) => ({
        ...product,
        new: index % 5 === 0,
        outOfStock: index % 7 === 0,
        idealFor: ['Men', 'Women', 'Baby & Kids'][index % 3],
        occasion: ['Casual', 'Formal', 'Business'][index % 3],
        fabric: ['Cotton', 'Silk', 'Wool', 'Synthetic'][index % 4],
        work: ['Embroidery', 'Print', 'Handloom'][index % 3],
        segment: ['Premium', 'Mid-range', 'Budget'][index % 3],
        suitableFor: ['Daily Wear', 'Party Wear', 'Office Wear', 'Outdoor Activities'][index % 4],
        rawMaterials: ['Organic', 'Recycled', 'Natural', 'Synthetic'][index % 4],
        pattern: ['Solid', 'Striped', 'Checkered', 'Printed', 'Floral'][index % 5],
        customizable: index % 2 === 0
      }))
      
      setProducts(data)
      // Apply current filters to the newly fetched products
      applyFilters(data, filters)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Provide fallback data when API fails
      const fallbackData = generateFallbackProducts(12) // Generate 12 fallback products
      setProducts(fallbackData)
      applyFilters(fallbackData, filters)
    } finally {
      setLoading(false)
    }
  }
  
  // Function to generate fallback products when API is down
  const generateFallbackProducts = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Fallback Product ${index + 1}`,
      price: 19.99 + (index * 10),
      description: 'This is a fallback product while the API is unavailable',
      image: 'https://via.placeholder.com/150',
      category: ['clothing', 'electronics', 'jewelry', 'accessories'][index % 4],
      new: index % 5 === 0,
      outOfStock: index % 7 === 0,
      idealFor: ['Men', 'Women', 'Baby & Kids'][index % 3],
      occasion: ['Casual', 'Formal', 'Business'][index % 3],
      fabric: ['Cotton', 'Silk', 'Wool', 'Synthetic'][index % 4],
      work: ['Embroidery', 'Print', 'Handloom'][index % 3],
      segment: ['Premium', 'Mid-range', 'Budget'][index % 3],
      suitableFor: ['Daily Wear', 'Party Wear', 'Office Wear', 'Outdoor Activities'][index % 4],
      rawMaterials: ['Organic', 'Recycled', 'Natural', 'Synthetic'][index % 4],
      pattern: ['Solid', 'Striped', 'Checkered', 'Printed', 'Floral'][index % 5],
      customizable: index % 2 === 0
    }))
  }
  
  // Function to apply filters to products
  const applyFilters = (productsToFilter, currentFilters) => {
    let filtered = [...productsToFilter]
    
    // Apply multi-select filters
    const multiSelectFilters = [
      'occasion', 'fabric', 'idealFor', 'work', 
      'segment', 'suitableFor', 'rawMaterials', 'pattern'
    ]
    
    multiSelectFilters.forEach(filterName => {
      if (currentFilters[filterName] && Array.isArray(currentFilters[filterName]) && currentFilters[filterName].length > 0) {
        filtered = filtered.filter(product => 
          currentFilters[filterName].includes(product[filterName])
        )
      }
    })
    
    // Filter by availability
    if (currentFilters.availability) {
      filtered = filtered.filter(product => !product.outOfStock)
    }
    
    // Filter by customizable
    if (currentFilters.customizable) {
      filtered = filtered.filter(product => product.customizable)
    }
    
    setFilteredProducts(filtered)
  }
  
  // Fetch products on initial load and when filters change
  useEffect(() => {
    fetchProducts()
    
    // Set up an interval to refresh products periodically (optional)
    const refreshInterval = setInterval(() => {
      fetchProducts()
    }, 300000) // Refresh every 5 minutes
    
    return () => clearInterval(refreshInterval)
  }, []) // Empty dependency array means this runs once on mount
  
  // Apply filters whenever they change
  useEffect(() => {
    if (products.length > 0) {
      applyFilters(products, filters)
    }
  }, [filters, products])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    // The filtering will be handled by the useEffect above
  }

  return (
    <main>
      <HeroSection />
      <div className="bg-white">
        {/* Products Section with Filters */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-sm font-medium">{filteredProducts.length} ITEMS</span>
              <button 
                className="ml-4 text-sm flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {showFilters ? 'HIDE FILTER' : 'SHOW FILTER'}
              </button>
            </div>
            <SortDropdown />
          </div>
          
          <div className="border-t border-b border-gray-200 py-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2D2D2D] border-r-transparent align-[-0.125em]"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Column */}
                {showFilters && (
                  <div className="w-full md:w-1/4 lg:w-1/5">
                    <ProductFilters onFilterChange={handleFilterChange} filters={filters} />
                  </div>
                )}
                
                {/* Products Grid */}
                <div className={`w-full ${showFilters ? 'md:w-3/4 lg:w-4/5' : 'w-full'}`}>
                  <ProductGrid products={filteredProducts} filtersHidden={!showFilters} />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}