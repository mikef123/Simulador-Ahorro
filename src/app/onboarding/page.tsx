'use client'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

const schema = z.object({
  fullName: z.string().min(3, 'Ingresa tu nombre completo'),

  document: z.string().min(5, 'Ingresa un número de documento válido'),

  email: z.string().email('Correo electrónico inválido'),

  recaptcha: z.string().refine((val) => val === 'OK', {
    message: 'Recaptcha inválido',
  }),
})

type FormData = z.infer<typeof schema>
export default function OnboardingForm() {
  const [successCode, setSuccessCode] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recaptcha: 'fail',
    },
  })

  const onSubmit = (data: FormData) => {
    const code = uuidv4().split('-')[0].toUpperCase()
    setSuccessCode(code)
    reset()
  }

  return (
    <div className="max-w-lg mx-auto p-8 text-white bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Onboarding</h1>
      {successCode ? (
        <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">¡Registro exitoso!</h2>
          <p className="mb-4">Tu solicitud fue registrada exitosamente:</p>
          <p className="bg-white/10 border border-white/20 p-4 rounded-lg text-lg font-mono">
            Código de solicitud: <strong>{successCode}</strong>
          </p>
          <button
            onClick={() => setSuccessCode(null)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-semibold"
          >
            Realizar otro registro
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4">Regístrate</h2>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Nombre completo</label>
            <input
              type="text"
              {...register('fullName')}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Número de documento
            </label>
            <input
              type="text"
              {...register('document')}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
            />
            {errors.document && (
              <p className="text-red-500 mt-1">{errors.document.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
              onChange={(e) => {
                setValue('email', e.target.value)
                setRecaptcha('OK')
                setValue('recaptcha', 'OK')
              }}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email?.message}</p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              id="captchaCheck"
              onChange={(e) => {
                setValue('recaptcha', e.target.checked ? 'OK' : 'FAIL')
              }}
              className="w-4 h-4"
            />
            <label htmlFor="captchaCheck" className="text-gray-300">
              No soy un robot
            </label>
          </div>

          {errors.recaptcha && (
            <p className="text-red-400 text-sm">{errors.recaptcha.message}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-semibold"
          >
            Registrarse
          </button>
        </form>
      )}
    </div>
  )
}
