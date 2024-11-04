import { Text } from '@/components/Text'
import { Movie } from '@/hooks/useMovieList/types'
import { View } from 'react-native'

export const WinnersByYearItem = ({ item }: { item: Movie }) => {
  return (
    <View
      testID="winners-by-year-item-container"
      style={{
        padding: 10,
        backgroundColor: '#f1f1f1',
        width: 300,
        borderRadius: 5,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 0.2 }}>
        <Text fow={600}>ID</Text>
        <Text fow={600}>Ano</Text>
        <Text fow={600}>Filme</Text>
      </View>
      <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
        <Text fow={400}>{item.id}</Text>
        <Text fow={400}>{item.year}</Text>
        <Text fow={400} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </View>
  )
}
