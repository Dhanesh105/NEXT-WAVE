export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ProductGrid from '../../components/ProductGrid';
import ProductFilters from '../../components/ProductFilters';
import SortDropdown from '../../components/SortDropdown';

async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products?limit=12');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  let products = await res.json();
  
  // Add some demo properties for display purposes
  products = products.map((product, index) => ({
    ...product,
    new: index % 5 === 0,
    outOfStock: index % 7 === 0,
    idealFor: ['Men', 'Women', 'Children'][index % 3],
    occasion: ['Casual', 'Formal', 'Business'][index % 3],
    fabric: ['Cotton', 'Silk', 'Wool', 'Synthetic'][index % 4],
    customizable: index % 2 === 0
  }));
  
  return products;
}

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-sm font-medium">3425 ITEMS</span>
          </div>
          <SortDropdown />
        </div>
        
        <div className="border-t border-b border-gray-200 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Column */}
            <div className="w-full md:w-1/4 lg:w-1/5">
              <Suspense fallback={<div>Loading filters...</div>}>
                <ProductFilters 
                  onFilterChange={() => {}} 
                  filters={{
                    occasion: '',
                    fabric: '',
                    availability: false
                  }} 
                />
              </Suspense>
            </div>
            
            {/* Products Grid */}
            <div className="w-full md:w-3/4 lg:w-4/5">
              <Suspense fallback={<div>Loading products...</div>}>
                <ProductGrid products={products} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}