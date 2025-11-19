import ProductsPage from '../page'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Products Page', () => {
  it('renderiza correctamente los productos', () => {
    render(<ProductsPage />)

    expect(screen.getByText('Productos Financieros')).toBeDefined()
  })
  it('filtra productos por texto', () => {
    render(<ProductsPage />)

    const input = screen.getByPlaceholderText('Buscar productos...')

    fireEvent.change(input, { target: { value: 'Nómina' } })

    // Debe aparecer el producto Nómina
    expect(screen.getAllByText(/Nómina/i).length).toBeGreaterThan(0)
  })
})
