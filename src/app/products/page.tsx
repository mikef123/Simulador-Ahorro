export const revalidate = 10

import productsData from '@/data/products.json'
import Filters from './Filters'
export default function ProductsPage() {
  const products = productsData

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Productos Financieros</h1>
      <Filters products={products} />
    </div>
  )
}
