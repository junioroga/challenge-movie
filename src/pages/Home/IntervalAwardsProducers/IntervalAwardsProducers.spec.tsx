import { useIntervalAwardsProducers } from '@/hooks'
import { render } from '@testing-library/react-native'
import { IntervalAwardsProducers } from './IntervalAwardsProducers'

// Mock do hook
jest.mock('@/hooks', () => ({
  useIntervalAwardsProducers: jest.fn(),
}))

const mockUseIntervalAwardsProducers = useIntervalAwardsProducers as jest.Mock

describe('IntervalAwardsProducers', () => {
  const mockData = {
    min: [
      {
        producer: 'Producer 1',
        interval: 1,
        previousWin: 2000,
        followingWin: 2001,
      },
    ],
    max: [
      {
        producer: 'Producer 2',
        interval: 10,
        previousWin: 2000,
        followingWin: 2010,
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o loading state corretamente', () => {
    mockUseIntervalAwardsProducers.mockReturnValue({
      isLoading: true,
      data: null,
    })

    const { getByTestId } = render(<IntervalAwardsProducers type="min" />)

    expect(getByTestId('interval-awards-skeleton')).toBeTruthy()
  })

  it('deve renderizar a mensagem de vazio quando não houver dados', () => {
    mockUseIntervalAwardsProducers.mockReturnValue({
      isLoading: false,
      data: { min: [], max: [] },
    })

    const { getByText } = render(<IntervalAwardsProducers type="min" />)

    expect(getByText('Nenhum resultado encontrado')).toBeTruthy()
  })

  it('deve renderizar a lista de intervalos mínimos corretamente', () => {
    mockUseIntervalAwardsProducers.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByText } = render(<IntervalAwardsProducers type="min" />)

    expect(getByText('Producer 1')).toBeTruthy()
  })

  it('deve renderizar a lista de intervalos máximos corretamente', () => {
    mockUseIntervalAwardsProducers.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByText } = render(<IntervalAwardsProducers type="max" />)

    expect(getByText('Producer 2')).toBeTruthy()
  })

  it('deve aplicar os estilos corretos no FlatList', () => {
    mockUseIntervalAwardsProducers.mockReturnValue({
      isLoading: false,
      data: mockData,
    })

    const { getByTestId } = render(<IntervalAwardsProducers type="min" />)

    const flatList = getByTestId('interval-awards-flatlist')
    expect(flatList.props.contentContainerStyle).toEqual({
      paddingHorizontal: 16,
      paddingVertical: 12,
    })
  })
})
