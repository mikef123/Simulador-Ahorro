import ProductCard from './components/ProductCard'

export default function ProductsList({ products }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
