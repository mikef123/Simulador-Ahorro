'use client'

import { useEffect, useMemo, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { debounce } from './utils/debounce'
import ProductsList from './ProductList'

const types = ['', 'Ahorro', 'Nómina']

export default function Filters({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)

  const debouncedFilter = useMemo(
    () =>
      debounce((term: string, type: string) => {
        let filtered = products
        if (term) {
          filtered = filtered.filter((products) =>
            products.name.toLowerCase().includes(term.toLowerCase())
          )
        }
        if (type) {
          filtered = filtered.filter((products) => products.type === type)
        }
        setFilteredProducts(filtered)
      }, 300),
    [products]
  )

  useEffect(() => {
    debouncedFilter(searchTerm, typeFilter)
  }, [searchTerm, typeFilter, debouncedFilter])

  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <div className="relative w-48 z-10">
          <Listbox value={typeFilter} onChange={setTypeFilter}>
            <div className="relative w-48">
              <Listbox.Button className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg text-left">
                {typeFilter === '' ? 'Todos los tipos' : typeFilter}
              </Listbox.Button>

              <Listbox.Options className="absolute w-full mt-2 bg-black border border-white/20 rounded-lg shadow-xl z-50">
                {types.map((type) => (
                  <Listbox.Option
                    key={type}
                    value={type}
                    className="cursor-pointer select-none p-3 text-white hover:bg-white/10"
                  >
                    {type === '' ? 'Todos los tipos' : type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>

      <ProductsList products={filteredProducts} />

      {filteredProducts.length === 0 && (
        <p className="mt-4 text-gray-500">No se encontraron productos.</p>
      )}
    </div>
  )
}
