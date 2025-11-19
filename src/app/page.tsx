'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-white mt-10">
      <h1 className="text-4xl font-bold mb-4">BCS Prueba Técnica – Frontend</h1>

      <p className="text-gray-300 max-w-2xl mb-8">
        Bienvenido. Esta aplicación contiene tres módulos solicitados en la
        prueba técnica: el listado de productos financieros, un simulador de
        ahorro y el proceso de onboarding con validación de recaptcha y
        generación de código de solicitud (UUID).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          href="/products"
          className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Productos</h2>
          <p className="text-gray-400 text-sm">
            Listado con filtros y búsqueda.
          </p>
        </Link>
        <Link
          href="/simulator"
          className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Simulador</h2>
          <p className="text-gray-400 text-sm">
            Calcule el crecimiento del ahorro.
          </p>
        </Link>
        <Link
          href="/onboarding"
          className="bg-white/10 border border-white/20 p-6 rounded-xl hover:bg-white/20 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Onboarding</h2>
          <p className="text-gray-400 text-sm">
            Registro con validación y recaptcha.
          </p>
        </Link>
      </div>
    </div>
  )
}
