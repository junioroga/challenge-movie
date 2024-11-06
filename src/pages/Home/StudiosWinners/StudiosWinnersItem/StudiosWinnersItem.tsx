import { Text } from '@/components/Text'
import { Studios } from '@/hooks/useMovieList/types'
import { View } from 'react-native'

export const StudiosWinnersItem = ({ item }: { item: Studios }) => {
  return (
    <View
      testID="studios-winners-container"
      style={{
        padding: 10,
        backgroundColor: '#f1f1f1',
        width: 200,
        justifyContent: 'space-between',
        borderRadius: 5,
        gap: 5,
      }}
    >
      <View>
        <Text fow={600}>Estúdio</Text>
        <Text fow={400} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View>
        <Text fow={600}>Premiações</Text>
        <Text fow={400}>{item.winCount}</Text>
      </View>
    </View>
  )
}
