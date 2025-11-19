'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { calcInterest } from './utils/calcInterest'

const schema = z.object({
  initialAmount: z
    .string()
    .min(1, 'Debe ingresar un valor')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Debe ser un número mayor a 0',
    }),

  monthlyAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Debe ser un número válido',
    }),

  months: z
    .string()
    .min(1, 'Debe ingresar los meses')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Debe ser mayor a 0',
    })
    .refine((val) => val <= 360, {
      message: 'Máximo 360 meses',
    }),
})

type FormData = z.infer<typeof schema>

export default function SavingsSimulatorForm() {
  const [result, setResult] = useState<number | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const { initialAmount, monthlyAmount, months } = data
    const total = calcInterest(initialAmount, monthlyAmount, months)
    setResult(total)
  }

  const months = watch('months')

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
      <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-full max-w-md">
        {/* <div className="max-w-xl mx-auto p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl"> */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Simulador de Ahorro
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-gray-300 font-medium mb-1 block">
              Monto Inicial
            </label>
            <input
              type="number"
              {...register('initialAmount')}
              className="w-full bg-white/10 border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white p-3 rounded-xl transition shadow-inner"
            />

            {errors.initialAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.initialAmount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white mb-1">Aporte Mensual</label>
            <input
              type="number"
              step="0.01"
              {...register('monthlyAmount')}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.monthlyAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.monthlyAmount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-white mb-1">Plazo (meses)</label>
            <input
              type="number"
              {...register('months')}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.months && (
              <p className="text-red-500 text-sm mt-1">
                {errors.months.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white p-3 rounded-xl font-semibold shadow-lg"
          >
            Calcular
          </button>
          <button
            type="button"
            onClick={() => {
              reset()
              setResult(null)
            }}
            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl"
          >
            Limpiar
          </button>
        </form>

        {result !== null && (
          <div className="mt-6 bg-white/10 backdrop-blur border border-white/20 p-5 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-400">Resultado</h2>
            <p className="mt-2 text-gray-300">
              Después de
              <span className="text-white font-semibold"> {months} </span>
              meses, tendrás un total de
            </p>

            <p className="text-3xl mt-4 font-bold text-green-400">
              {result.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
