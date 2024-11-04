
import { render } from '@testing-library/react-native';
import { MultipleWinnersItem } from './MultipleWinnersItem';

jest.mock('@/components/Text');

describe('MultipleWinnersItem', () => {
  const mockItem = {
    year: 2000,
    winnerCount: 3
  };

  it('deve renderizar corretamente com os dados fornecidos', () => {
    const { getByText } = render(
      <MultipleWinnersItem item={mockItem} />
    );

    // Verifica os labels
    expect(getByText('Vencedores')).toBeTruthy();
    expect(getByText('Ano')).toBeTruthy();

    // Verifica os valores
    expect(getByText('3')).toBeTruthy();
    expect(getByText('2000')).toBeTruthy();
  });

  it('deve aplicar os estilos corretos no container', () => {
    const { getByTestId } = render(
      <MultipleWinnersItem item={mockItem} />
    );

    const container = getByTestId('multiple-winners-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        padding: 10,
        backgroundColor: '#f1f1f1',
        justifyContent: 'space-between',
        borderRadius: 5,
      })
    );
  });

  it('deve aplicar o peso da fonte correto nos labels', () => {
    const { getAllByText } = render(
      <MultipleWinnersItem item={mockItem} />
    );

    const labels = getAllByText(/(Vencedores|Ano)/);
    labels.forEach(label => {
      expect(label.props.fow).toBe(600);
    });
  });

  it('deve aplicar o peso da fonte correto nos valores', () => {
    const { getByText } = render(
      <MultipleWinnersItem item={mockItem} />
    );

    const winnerCount = getByText(mockItem.winnerCount.toString());
    const year = getByText(mockItem.year.toString());

    expect(winnerCount.props.fow).toBe(400);
    expect(year.props.fow).toBe(400);
  });
}); 