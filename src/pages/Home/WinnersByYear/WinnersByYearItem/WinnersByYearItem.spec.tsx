import { render, screen } from '@testing-library/react-native'
import { WinnersByYearItem } from './WinnersByYearItem'

describe('WinnersByYearItem', () => {
  const mockMovie = {
    id: 1,
    year: 2020,
    title: 'Teste de Filme',
    studios: ['Studio 1', 'Studio 2'],
    producers: ['Producer 1', 'Producer 2'],
    winner: true,
  }

  it('deve renderizar corretamente com as propriedades do filme', () => {
    render(<WinnersByYearItem item={mockMovie} />)

    // Verifica se o container existe
    expect(screen.getByTestId('winners-by-year-item-container')).toBeTruthy()

    // Verifica se os labels estão presentes
    expect(screen.getByText('ID')).toBeTruthy()
    expect(screen.getByText('Ano')).toBeTruthy()
    expect(screen.getByText('Filme')).toBeTruthy()

    // Verifica se os valores do filme estão presentes
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('2020')).toBeTruthy()
    expect(screen.getByText('Teste de Filme')).toBeTruthy()
  })

  it('deve truncar o título do filme quando for muito longo', () => {
    const longTitleMovie = {
      ...mockMovie,
      title: 'Este é um título muito longo que deve ser truncado na visualização',
    }

    render(<WinnersByYearItem item={longTitleMovie} />)

    const titleElement = screen.getByText(longTitleMovie.title)
    expect(titleElement.props.numberOfLines).toBe(1)
  })
})
