import { describe, it, expect } from 'vitest'
import { calcInterest } from './calcInterest'

describe('calcInterest', () => {
  it('calcula correctamente el total después de 12 meses', () => {
    const initial = 1000
    const monthly = 100
    const months = 12

    const result = calcInterest(initial, monthly, months)

    // El resultado debe ser un número y mayor al aporte total
    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThan(initial + monthly * months)
  })
  it('maneja meses = 0', () => {
    const result = calcInterest(1000, 100, 0)
    expect(result).toBe(1000)
  })
})
