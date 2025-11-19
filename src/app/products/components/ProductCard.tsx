export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>

      <p className="text-gray-300">
        <span className="font-semibold text-gray-400">Tipo:</span>{' '}
        {product.type}
      </p>

      <p className="mt-2">
        <span className="font-semibold text-blue-400">Tasa:</span>{' '}
        <span className="text-blue-300">{product.tasa}</span>
      </p>
    </div>
  )
}
