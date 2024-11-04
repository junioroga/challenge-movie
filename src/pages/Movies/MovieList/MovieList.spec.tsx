import { fireEvent, render, screen } from '@testing-library/react-native'
import { MovieList } from './MovieList'

describe('MovieList', () => {
  const mockProps = {
    isLoading: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: jest.fn(),
    data: [
      { id: 1, title: 'Filme 1', year: 2021, winner: true, studios: ['Studio 1'], producers: ['Producer 1'] },
      { id: 2, title: 'Filme 2', year: 2022, winner: false, studios: ['Studio 2'], producers: ['Producer 2'] }
    ],
    onRefresh: jest.fn(),
    refreshingManual: false,
    limit: 10
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar a lista vazia quando estiver carregando', () => {
    render(
      <MovieList
        {...mockProps}
        isLoading={true}
        data={[]}
      />
    )

    const flatList = screen.getByTestId('movie-list')
    expect(flatList.props.data).toEqual([])
  })

  it('deve renderizar o skeleton quando estiver carregando e lista vazia', () => {
    render(
      <MovieList
        {...mockProps}
        isLoading={true}
        data={[]}
      />
    )

    expect(screen.getByTestId('movie-list-skeleton')).toBeTruthy()
  })

  it('deve renderizar a mensagem de lista vazia quando não houver dados', () => {
    render(
      <MovieList
        {...mockProps}
        data={[]}
      />
    )

    expect(screen.getByText('Nenhum filme encontrado')).toBeTruthy()
  })

  it('deve renderizar a lista de filmes corretamente', () => {
    render(<MovieList {...mockProps} />)

    expect(screen.getByText('Filme 1')).toBeTruthy()
    expect(screen.getByText('Filme 2')).toBeTruthy()
  })

  it('deve renderizar o separador entre os itens', () => {
    render(<MovieList {...mockProps} />)

    const separator = screen.getByTestId('movie-list-separator')
    expect(separator.props.style).toEqual({
      height: 1,
      width: '100%',
      marginVertical: 4,
      backgroundColor: '#d1d1d1'
    })
  })

  it('deve renderizar o loading indicator quando estiver buscando próxima página', () => {
    render(
      <MovieList
        {...mockProps}
        isFetchingNextPage={true}
      />
    )

    expect(screen.getByTestId('movie-list-footer-loading')).toBeTruthy()
  })

  it('deve chamar fetchNextPage quando atingir o final da lista', () => {
    render(
      <MovieList
        {...mockProps}
        hasNextPage={true}
      />
    )

    const flatList = screen.getByTestId('movie-list')
    fireEvent(flatList, 'onEndReached')

    expect(mockProps.fetchNextPage).toHaveBeenCalled()
  })

  it('não deve chamar fetchNextPage quando já estiver carregando próxima página', () => {
    render(
      <MovieList
        {...mockProps}
        hasNextPage={true}
        isFetchingNextPage={true}
      />
    )

    const flatList = screen.getByTestId('movie-list')
    fireEvent(flatList, 'onEndReached')

    expect(mockProps.fetchNextPage).not.toHaveBeenCalled()
  })

  it('deve chamar onRefresh quando puxar para atualizar', () => {
    render(<MovieList {...mockProps} />)

    const flatList = screen.getByTestId('movie-list')
    fireEvent(flatList, 'onRefresh')

    expect(mockProps.onRefresh).toHaveBeenCalled()
  })

  it('deve aplicar os estilos corretos ao container', () => {
    const { getByTestId } = render(<MovieList {...mockProps} />)

    const flatList = getByTestId('movie-list')
    expect(flatList.props.contentContainerStyle).toEqual(
      expect.objectContaining({
        flexGrow: 1,
        paddingHorizontal: 16
      })
    )
  })
}) 