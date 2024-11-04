import { Text } from '@/components/Text'
import { useIntervalAwardsProducers } from '@/hooks'
import { IntervalAwardsProducers as IntervalAwardsProducersType } from '@/hooks/useMovieList/types'
import { useCallback } from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { IntervalAwardsProducersItem } from './IntervalAwardsProducersItem'
import { Skeleton } from './Skeleton'

export const IntervalAwardsProducers = ({ type }: { type: 'min' | 'max' }) => {
  const { isLoading, data } = useIntervalAwardsProducers()

  const renderItem: ListRenderItem<IntervalAwardsProducersType> = useCallback(
    ({ item }) => <IntervalAwardsProducersItem item={item} />,
    []
  )

  const renderEmpty = useCallback(
    () => (
      <View style={{ height: 110 }}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text fow={500}>Nenhum resultado encontrado</Text>
          </View>
        )}
      </View>
    ),
    [isLoading]
  )

  const keyExtractor = useCallback(
    (item: IntervalAwardsProducersType, index: number) => `${String(item.producer)}${index}`,
    []
  )

  return (
    <Animated.FlatList
      testID="interval-awards-flatlist"
      keyExtractor={keyExtractor}
      data={isLoading ? [] : type === 'min' ? data?.min : data?.max}
      horizontal
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      initialNumToRender={10}
      showsHorizontalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition}
    />
  )
}
