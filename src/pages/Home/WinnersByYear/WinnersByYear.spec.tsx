import { useWinnersByYear } from '@/hooks'
import { render, screen } from '@testing-library/react-native'
import { WinnersByYear } from './WinnersByYear'

jest.mock('@/components/Select');

jest.mock('@/hooks', () => ({
  useWinnersByYear: jest.fn()
}))

const mockUseWinnersByYear = useWinnersByYear as jest.Mock

describe('WinnersByYear', () => {
  beforeEach(() => {
    mockUseWinnersByYear.mockReset()
    mockUseWinnersByYear.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: []
    })
  })

  it('deve renderizar o título "Ano"', () => {
    render(<WinnersByYear />)
    expect(screen.getByText('Ano')).toBeTruthy()
  })

  it('deve mostrar mensagem quando nenhum ano estiver selecionado', () => {
    render(<WinnersByYear />)
    expect(screen.getByText('Selecione um ano para filtrar')).toBeTruthy()
  })

  it('deve mostrar o skeleton durante o carregamento', () => {
    mockUseWinnersByYear.mockReturnValue({
      isLoading: true,
      isFetching: true,
      data: []
    })

    render(<WinnersByYear />)
    expect(screen.getByTestId('winners-by-year-skeleton')).toBeTruthy()
  })

  it('deve renderizar a lista de filmes quando houver dados', () => {
    const mockMovies = [
      { id: 1, title: 'Filme 1', year: 2021 },
      { id: 2, title: 'Filme 2', year: 2021 }
    ]

    mockUseWinnersByYear.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockMovies
    })

    render(<WinnersByYear />)
    
    const flatList = screen.getByTestId('winners-by-year-flatlist')
    expect(flatList.props.data).toEqual(mockMovies)
  })

  it('deve renderizar o separador entre os itens da lista', () => {
    const mockMovies = [
      { id: 1, title: 'Filme 1', year: 2021 },
      { id: 2, title: 'Filme 2', year: 2021 }
    ]

    mockUseWinnersByYear.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockMovies
    })

    render(<WinnersByYear />)
    
    const separator = screen.getByTestId('winners-by-year-separator')
    expect(separator).toBeTruthy()
    expect(separator.props.style).toEqual({ width: 10 })
  })
}) 