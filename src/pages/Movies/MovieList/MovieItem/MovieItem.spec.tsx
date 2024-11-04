import { render, screen } from '@testing-library/react-native'
import { MovieItem } from './MovieItem'

describe('MovieItem', () => {
  const mockMovie = {
    id: 1,
    title: 'Filme de Teste',
    winner: true,
    year: 2023,
    studios: ['Studio 1', 'Studio 2'],
    producers: ['Producer 1', 'Producer 2']
  }

  it('deve renderizar corretamente os labels', () => {
    render(<MovieItem item={mockMovie} />)

    expect(screen.getByText('ID')).toBeTruthy()
    expect(screen.getByText('Filme')).toBeTruthy()
    expect(screen.getByText('Vencedor?')).toBeTruthy()
    expect(screen.getByText('Ano')).toBeTruthy()
  })

  it('deve renderizar corretamente os dados do filme', () => {
    render(<MovieItem item={mockMovie} />)

    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('Filme de Teste')).toBeTruthy()
    expect(screen.getByText('Sim')).toBeTruthy()
    expect(screen.getByText('2023')).toBeTruthy()
  })

  it('deve renderizar "Não" quando o filme não for vencedor', () => {
    const nonWinnerMovie = { ...mockMovie, winner: false }
    render(<MovieItem item={nonWinnerMovie} />)

    expect(screen.getByText('Não')).toBeTruthy()
  })

  it('deve aplicar os estilos corretos aos containers', () => {
    const { getByTestId } = render(<MovieItem item={mockMovie} />)

    const mainContainer = getByTestId('movie-item-container')
    const labelsContainer = getByTestId('movie-item-labels')
    const valuesContainer = getByTestId('movie-item-values')

    expect(mainContainer.props.style).toEqual({ flexDirection: 'row' })
    expect(labelsContainer.props.style).toEqual({ flex: 0.3 })
    expect(valuesContainer.props.style).toEqual({ 
      flex: 0.7, 
      alignItems: 'flex-end' 
    })
  })
}) 