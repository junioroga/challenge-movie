
import { useStudiosWinners } from '@/hooks';
import { render } from '@testing-library/react-native';
import { StudiosWinners } from './StudiosWinners';

// Mock do hook
jest.mock('@/hooks', () => ({
  useStudiosWinners: jest.fn()
}));

const mockUseStudiosWinners = useStudiosWinners as jest.Mock;

describe('StudiosWinners', () => {
  const mockData = {
    studios: [
      {
        name: 'Studio 1',
        winCount: 5
      },
      {
        name: 'Studio 2',
        winCount: 3
      },
      {
        name: 'Studio 3',
        winCount: 2
      }
    ]
  };

  const mockData2 = {
    studios: [
      {
        name: 'Studio 1',
        winCount: 5
      },
      {
        name: 'Studio 2',
        winCount: 3
      },
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o loading state corretamente', () => {
    mockUseStudiosWinners.mockReturnValue({
      isLoading: true,
      data: null
    });

    const { getByTestId } = render(<StudiosWinners />);
    expect(getByTestId('studios-winners-skeleton')).toBeTruthy();
  });

  it('deve renderizar a mensagem de vazio quando não houver dados', () => {
    mockUseStudiosWinners.mockReturnValue({
      isLoading: false,
      data: { studios: [] }
    });

    const { getByText } = render(<StudiosWinners />);
    expect(getByText('Nenhum resultado encontrado')).toBeTruthy();
  });

  it('deve renderizar apenas os 3 primeiros estúdios', () => {
    const extendedData = {
      studios: [
        ...mockData.studios,
        { name: 'Studio 4', winCount: 1 },
        { name: 'Studio 5', winCount: 1 }
      ]
    };

    mockUseStudiosWinners.mockReturnValue({
      isLoading: false,
      data: extendedData
    });

    const { queryByText } = render(<StudiosWinners />);
    
    expect(queryByText('Studio 1')).toBeTruthy();
    expect(queryByText('Studio 2')).toBeTruthy();
    expect(queryByText('Studio 3')).toBeTruthy();
    expect(queryByText('Studio 4')).toBeFalsy();
    expect(queryByText('Studio 5')).toBeFalsy();
  });

  it('deve aplicar os estilos corretos no FlatList', () => {
    mockUseStudiosWinners.mockReturnValue({
      isLoading: false,
      data: mockData
    });

    const { getByTestId } = render(<StudiosWinners />);
    
    const flatList = getByTestId('studios-winners-flatlist');
    expect(flatList.props.contentContainerStyle).toEqual({
      paddingHorizontal: 16,
      paddingVertical: 12,
    });
  });

  it('deve renderizar o separador corretamente', () => {
    mockUseStudiosWinners.mockReturnValue({
      isLoading: false,
      data: mockData2
    });

    const { getByTestId } = render(<StudiosWinners />);
    
    const separator = getByTestId('studios-winners-separator');
    expect(separator.props.style).toEqual({ width: 10 });
  });

  it('deve gerar key extractor corretamente', () => {
    mockUseStudiosWinners.mockReturnValue({
      isLoading: false,
      data: mockData
    });

    const { getByTestId } = render(<StudiosWinners />);
    
    const flatList = getByTestId('studios-winners-flatlist');
    const firstItem = mockData.studios[0];
    const key = flatList.props.keyExtractor(firstItem, 0);
    
    expect(key).toBe(`${firstItem.name}0`);
  });
}); 