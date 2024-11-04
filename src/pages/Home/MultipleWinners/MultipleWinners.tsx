import { Text } from '@/components/Text'
import { useMultipleWinners } from '@/hooks'
import { MultipleWinnersYears } from '@/hooks/useMovieList/types'
import { useCallback } from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { MultipleWinnersItem } from './MultipleWinnersItem'
import { Skeleton } from './Skeleton'

export const MultipleWinners = () => {
  const { isLoading, data } = useMultipleWinners()

  const renderItem: ListRenderItem<MultipleWinnersYears> = useCallback(
    ({ item }) => <MultipleWinnersItem item={item} />,
    []
  )

  const renderSeparator = useCallback(() => (
    <View testID="multiple-winners-separator" style={{ width: 10 }} />
  ), [])

  const renderEmpty = useCallback(
    () => (
      <View style={{ height: 110 }}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text fow={500}>Nenhum resultado encontrado</Text>
          </View>
        )}
      </View>
    ),
    [isLoading]
  )

  const keyExtractor = useCallback(
    (item: MultipleWinnersYears, index: number) => `${String(item.winnerCount)}${index}`,
    []
  )

  return (
    <Animated.FlatList
      testID="multiple-winners-flatlist"
      keyExtractor={keyExtractor}
      data={isLoading ? [] : data?.years}
      horizontal
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
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
