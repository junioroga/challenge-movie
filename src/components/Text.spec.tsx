import { render } from '@testing-library/react-native'
import { Text } from './Text'

jest.mock('@/utils/responsiveFontSize')

describe('Text', () => {
  it('deve renderizar o texto corretamente', () => {
    const { getByText } = render(<Text>Olá Mundo</Text>)

    expect(getByText('Olá Mundo')).toBeTruthy()
  })

  it('deve aplicar o peso da fonte corretamente', () => {
    const { getByText } = render(<Text fow={700}>Texto em Negrito</Text>)

    const textElement = getByText('Texto em Negrito')
    expect(textElement.props.style).toContainEqual({
      fontFamily: 'Poppins_700Bold',
      fontSize: expect.any(Number),
    })
  })

  it('deve aplicar o tamanho da fonte corretamente', () => {
    const { getByText } = render(<Text style={{ fontSize: 20 }}>Texto Grande</Text>)

    const textElement = getByText('Texto Grande')
    expect(textElement.props.style[1]).toEqual({
      fontSize: 20,
    })
  })

  it('deve aplicar múltiplos estilos corretamente', () => {
    const { getByText } = render(
      <Text style={[{ fontSize: 18 }, { color: 'red' }]}>Texto Estilizado</Text>
    )

    const textElement = getByText('Texto Estilizado')
    expect(textElement.props.style).toContainEqual({
      fontFamily: 'Poppins_400Regular',
      fontSize: 18,
    })
    expect(textElement.props.style[1]).toContainEqual({
      color: 'red',
    })
  })
})
