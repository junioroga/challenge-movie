import { useMultipleWinners } from '@/hooks'
import { render } from '@testing-library/react-native'
import { MultipleWinners } from './MultipleWinners'

// Mock do hook
jest.mock('@/hooks', () => ({
  useMultipleWinners: jest.fn(),
}))

// Mock do componente Animated
jest.mock('react-native-reanimated', () => ({
  ...jest.requireActual('react-native-reanimated'),
  FlatList: require('react-native').FlatList,
  LinearTransition: jest.fn(),
}))

const mockUseMultipleWinners = useMultipleWinners as jest.Mock

describe('MultipleWinners', () => {
  const mockData = {
    years: [
      {
        year: 2000,
        winnerCount: 2,
      },
      {
        year: 2004,
        winnerCount: 3,
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o loading state corretamente', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: true,
      data: null,
    })

    const { getByTestId } = render(<MultipleWinners />)
    expect(getByTestId('multiple-winners-skeleton')).toBeTruthy()
  })

  it('deve renderizar a mensagem de vazio quando não houver dados', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: false,
      data: { years: [] },
    })

    const { getByText } = render(<MultipleWinners />)
    expect(getByText('Nenhum resultado encontrado')).toBeTruthy()
  })

  it('deve renderizar a lista de vencedores múltiplos corretamente', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByText } = render(<MultipleWinners />)

    expect(getByText('2000')).toBeTruthy()
    expect(getByText('2004')).toBeTruthy()
  })

  it('deve aplicar os estilos corretos no FlatList', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByTestId } = render(<MultipleWinners />)

    const flatList = getByTestId('multiple-winners-flatlist')
    expect(flatList.props.contentContainerStyle).toEqual({
      paddingHorizontal: 16,
      paddingVertical: 12,
    })
  })

  it('deve renderizar o separador corretamente', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByTestId } = render(<MultipleWinners />)

    const separator = getByTestId('multiple-winners-separator')
    expect(separator.props.style).toEqual({ width: 10 })
  })

  it('deve gerar key extractor corretamente', () => {
    mockUseMultipleWinners.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByTestId } = render(<MultipleWinners />)

    const flatList = getByTestId('multiple-winners-flatlist')
    const firstItem = mockData.years[0]
    const key = flatList.props.keyExtractor(firstItem, 0)

    expect(key).toBe(`${firstItem.winnerCount}0`)
  })
})
