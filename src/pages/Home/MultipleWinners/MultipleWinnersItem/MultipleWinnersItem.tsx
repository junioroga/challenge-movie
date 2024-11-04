import { Text } from '@/components/Text'
import { MultipleWinnersYears } from '@/hooks/useMovieList/types'
import { View } from 'react-native'

export const MultipleWinnersItem = ({ item }: { item: MultipleWinnersYears }) => {
  return (
    <View
      testID="multiple-winners-container"
      style={{
        padding: 10,
        backgroundColor: '#f1f1f1',
        justifyContent: 'space-between',
        borderRadius: 5,
      }}
    >
      <View>
        <Text fow={600}>Vencedores</Text>
        <Text fow={400}>{item.winnerCount}</Text>
      </View>
      <View>
        <Text fow={600}>Ano</Text>
        <Text fow={400}>{item.year}</Text>
      </View>
    </View>
  )
}
