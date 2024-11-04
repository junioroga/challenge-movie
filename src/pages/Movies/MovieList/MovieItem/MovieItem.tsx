import { Text } from '@/components/Text'
import { Movie } from '@/hooks/useMovieList/types'
import { View } from 'react-native'

export const MovieItem = ({ item }: { item: Movie }) => {
  return (
    <View testID="movie-item-container" style={{ flexDirection: 'row' }}>
      <View testID="movie-item-labels" style={{ flex: 0.3 }}>
        <Text fow={600}>ID</Text>
        <Text fow={600}>Filme</Text>
        <Text fow={600}>Vencedor?</Text>
        <Text fow={600}>Ano</Text>
      </View>
      <View testID="movie-item-values" style={{ flex: 0.7, alignItems: 'flex-end' }}>
        <Text fow={400}>{item.id}</Text>
        <Text fow={400} numberOfLines={1}>
          {item.title}
        </Text>
        <Text fow={400}>{item.winner ? 'Sim' : 'Não'}</Text>
        <Text fow={400}>{item.year}</Text>
      </View>
    </View>
  )
}
