import ProductCard from './ProductCard'

export default function ProductGrid({ products, filtersHidden }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${filtersHidden ? 'xl:grid-cols-4' : 'lg:grid-cols-3'} gap-x-6 gap-y-10`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}