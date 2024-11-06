import { useMovieList } from '@/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { act, fireEvent, render, screen } from '@testing-library/react-native'
import { Movies } from './Movies'

jest.mock('@/hooks', () => ({
  useMovieList: jest.fn(),
}))

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}))

const mockUseMovieList = useMovieList as jest.Mock
const mockQueryClient = {
  removeQueries: jest.fn(),
}

describe('Movies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQueryClient as jest.Mock).mockReturnValue(mockQueryClient)
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      refetch: jest.fn(),
      data: { pages: [] },
    })
  })

  it('deve renderizar os títulos dos filtros', () => {
    render(<Movies />)

    expect(screen.getByText('Ano')).toBeTruthy()
    expect(screen.getByText('Vencedor?')).toBeTruthy()
  })

  it('deve renderizar a MovieList com as props corretas', () => {
    const mockData = {
      pages: [
        { id: 1, title: 'Filme 1' },
        { id: 2, title: 'Filme 2' },
      ],
    }

    const mockHasNextPage = true
    const mockFetchNextPage = jest.fn()

    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: mockHasNextPage,
      fetchNextPage: mockFetchNextPage,
      refetch: jest.fn(),
      data: mockData,
    })

    const { getByTestId } = render(<Movies />)

    const movieList = getByTestId('movie-list')
    expect(movieList.props.data).toEqual(mockData.pages)
    expect(typeof movieList.props.onEndReached).toBe('function')
    expect(movieList.props.onEndReachedThreshold).toBe(0.5)
    expect(movieList.props.refreshing).toBe(false)
  })

  it('deve chamar refetch quando onRefresh for acionado', async () => {
    const mockRefetch = jest.fn()
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      refetch: mockRefetch,
      data: { pages: [{ id: 1 }] },
    })

    const { getByTestId } = render(<Movies />)

    await act(async () => {
      const movieList = getByTestId('movie-list')
      await movieList.props.onRefresh()
    })

    expect(mockQueryClient.removeQueries).toHaveBeenCalledWith({ queryKey: ['movie-list'] })
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('deve lidar com o estado de refreshing manual', async () => {
    const mockRefetch = jest.fn()
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      refetch: mockRefetch,
      data: { pages: [{ id: 1 }] },
    })

    const { getByTestId } = render(<Movies />)

    await act(async () => {
      const movieList = getByTestId('movie-list')
      await movieList.props.onRefresh()
    })

    const movieListAfterRefresh = getByTestId('movie-list')
    expect(movieListAfterRefresh.props.refreshing).toBe(false)
  })

  it('não deve chamar fetchNextPage quando não houver próxima página', () => {
    const mockFetchNextPage = jest.fn()
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: mockFetchNextPage,
      refetch: jest.fn(),
      data: { pages: [{ id: 1 }] },
    })

    const { getByTestId } = render(<Movies />)

    const movieList = getByTestId('movie-list')
    fireEvent(movieList, 'onEndReached')

    expect(mockFetchNextPage).not.toHaveBeenCalled()
  })

  it('não deve chamar fetchNextPage quando já estiver carregando próxima página', () => {
    const mockFetchNextPage = jest.fn()
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: true,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
      refetch: jest.fn(),
      data: { pages: [{ id: 1 }] },
    })

    const { getByTestId } = render(<Movies />)

    const movieList = getByTestId('movie-list')
    fireEvent(movieList, 'onEndReached')

    expect(mockFetchNextPage).not.toHaveBeenCalled()
  })

  it('deve chamar fetchNextPage quando atingir o final da lista', () => {
    const mockFetchNextPage = jest.fn()
    mockUseMovieList.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
      refetch: jest.fn(),
      data: { pages: [{ id: 1 }] },
    })

    const { getByTestId } = render(<Movies />)

    const movieList = getByTestId('movie-list')
    fireEvent(movieList, 'onEndReached')

    expect(mockFetchNextPage).toHaveBeenCalled()
  })
})
