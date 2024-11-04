
import { render } from '@testing-library/react-native';
import { IntervalAwardsProducersItem } from './IntervalAwardsProducersItem';

describe('IntervalAwardsProducersItem', () => {
  const mockItem = {
    producer: 'Joel Silver',
    interval: 6,
    previousWin: 2000,
    followingWin: 2006
  };

  it('deve renderizar corretamente com os dados do produtor', () => {
    const { getByText } = render(
      <IntervalAwardsProducersItem item={mockItem} />
    );

    // Verifica os labels
    expect(getByText('Ano anterior')).toBeTruthy();
    expect(getByText('Ano posterior')).toBeTruthy();
    expect(getByText('Intervalo de anos')).toBeTruthy();
    expect(getByText('Produtor')).toBeTruthy();

    // Verifica os valores
    expect(getByText('2000')).toBeTruthy();
    expect(getByText('2006')).toBeTruthy();
    expect(getByText('6')).toBeTruthy();
    expect(getByText('Joel Silver')).toBeTruthy();
  });

  it('deve renderizar o nome do produtor com numberOfLines={1}', () => {
    const longNameItem = {
      ...mockItem,
      producer: 'Um nome muito longo de produtor que deve ser truncado na visualização'
    };

    const { getByText } = render(
      <IntervalAwardsProducersItem item={longNameItem} />
    );

    const producerText = getByText(longNameItem.producer);
    expect(producerText.props.numberOfLines).toBe(1);
  });

  it('deve aplicar os estilos corretos no container', () => {
    const { getByTestId } = render(
      <IntervalAwardsProducersItem item={mockItem} />
    );

    const container = getByTestId('interval-awards-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        padding: 10,
        backgroundColor: '#f1f1f1',
        width: 300,
        justifyContent: 'space-between',
        borderRadius: 5,
        flexDirection: 'row',
      })
    );
  });
}); 