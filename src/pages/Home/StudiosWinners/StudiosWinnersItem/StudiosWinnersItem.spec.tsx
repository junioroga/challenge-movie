import { render } from '@testing-library/react-native'
import { StudiosWinnersItem } from './StudiosWinnersItem'

jest.mock('@/components/Text')

describe('StudiosWinnersItem', () => {
  const mockItem = {
    name: 'Universal Pictures',
    winCount: 5,
  }

  it('deve renderizar corretamente com os dados do estúdio', () => {
    const { getByText } = render(<StudiosWinnersItem item={mockItem} />)

    // Verifica os labels
    expect(getByText('Estúdio')).toBeTruthy()
    expect(getByText('Premiações')).toBeTruthy()

    // Verifica os valores
    expect(getByText('Universal Pictures')).toBeTruthy()
    expect(getByText('5')).toBeTruthy()
  })

  it('deve aplicar os estilos corretos no container', () => {
    const { getByTestId } = render(<StudiosWinnersItem item={mockItem} />)

    const container = getByTestId('studios-winners-container')
    expect(container.props.style).toEqual(
      expect.objectContaining({
        padding: 10,
        backgroundColor: '#f1f1f1',
        width: 200,
        justifyContent: 'space-between',
        borderRadius: 5,
      })
    )
  })

  it('deve aplicar numberOfLines={1} no nome do estúdio', () => {
    const longNameItem = {
      name: 'Um nome muito longo de estúdio que deve ser truncado na visualização',
      winCount: 5,
    }

    const { getByText } = render(<StudiosWinnersItem item={longNameItem} />)

    const studioName = getByText(longNameItem.name)
    expect(studioName.props.numberOfLines).toBe(1)
  })

  it('deve aplicar o peso da fonte correto nos labels', () => {
    const { getAllByText } = render(<StudiosWinnersItem item={mockItem} />)

    const labels = getAllByText(/(Estúdio|Premiações)/)
    labels.forEach((label) => {
      expect(label.props.fow).toBe(600)
    })
  })

  it('deve aplicar o peso da fonte correto nos valores', () => {
    const { getByText } = render(<StudiosWinnersItem item={mockItem} />)

    const studioName = getByText(mockItem.name)
    const winCount = getByText(mockItem.winCount.toString())

    expect(studioName.props.fow).toBe(400)
    expect(winCount.props.fow).toBe(400)
  })
})
