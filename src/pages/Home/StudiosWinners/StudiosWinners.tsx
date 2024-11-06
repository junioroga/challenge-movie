import { Text } from '@/components/Text'
import { useStudiosWinners } from '@/hooks'
import { Studios } from '@/hooks/useMovieList/types'
import { useCallback } from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { Skeleton } from './Skeleton'
import { StudiosWinnersItem } from './StudiosWinnersItem'

export const StudiosWinners = () => {
  const { isLoading, data } = useStudiosWinners()

  const renderItem: ListRenderItem<Studios> = useCallback(
    ({ item }) => <StudiosWinnersItem item={item} />,
    []
  )

  const renderSeparator = useCallback(
    () => <View testID="studios-winners-separator" style={{ width: 10 }} />,
    []
  )

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
    (item: Studios, index: number) => `${String(item.name)}${index}`,
    []
  )

  return (
    <Animated.FlatList
      testID="studios-winners-flatlist"
      keyExtractor={keyExtractor}
      data={isLoading ? [] : data?.studios.slice(0, 3)}
      horizontal
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
      initialNumToRender={3}
      showsHorizontalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition}
    />
  )
}
