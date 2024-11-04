import { Text } from '@/components/Text'
import { IntervalAwardsProducers } from '@/hooks/useMovieList/types'
import { View } from 'react-native'

export const IntervalAwardsProducersItem = ({ item }: { item: IntervalAwardsProducers }) => {
  return (
    <View
      testID="interval-awards-container"
      style={{
        padding: 10,
        backgroundColor: '#f1f1f1',
        width: 300,
        justifyContent: 'space-between',
        borderRadius: 5,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text fow={600}>Ano anterior</Text>
        <Text fow={600}>Ano posterior</Text>
        <Text fow={600}>Intervalo de anos</Text>
        <Text fow={600}>Produtor</Text>
      </View>
      <View style={{ alignItems: 'flex-end', flex: 1 }}>
        <Text fow={400}>{item.previousWin}</Text>
        <Text fow={400}>{item.followingWin}</Text>
        <Text fow={400}>{item.interval}</Text>
        <Text fow={400} numberOfLines={1}>
          {item.producer}
        </Text>
      </View>
    </View>
  )
}
