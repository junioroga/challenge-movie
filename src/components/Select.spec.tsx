import { render } from '@testing-library/react-native'
import { Select } from './Select'

describe('Select', () => {
  const mockItems = [
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ]

  it('deve renderizar o componente Select padrão', () => {
    const onValueChange = jest.fn()
    const rendered = render(<Select items={mockItems} onValueChange={onValueChange} />)

    expect(rendered).toBeTruthy()
  })
})
