import { useCallback } from 'react'
import { ActivityIndicator, ListRenderItem, View } from 'react-native'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Movie } from '@/hooks/useMovieList/types'

import { Skeleton } from './Skeleton'

import { Text } from '@/components/Text'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { MovieItem } from './MovieItem'

type Props = Partial<Omit<ReturnType<typeof useInfiniteQuery>, 'data'>> & {
  limit: number
  data?: Movie[]
  onRefresh: () => void
  refreshingManual: boolean
}

export const MovieList = ({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  data,
  onRefresh,
  refreshingManual,
  limit,
}: Props) => {
  const { bottom } = useSafeAreaInsets()

  const renderItem: ListRenderItem<Movie> = useCallback(({ item }) => <MovieItem item={item} />, [])

  const renderSeparator = useCallback(
    () => (
      <View testID="movie-list-separator" style={{ height: 1, width: '100%', marginVertical: 4, backgroundColor: '#d1d1d1' }} />
    ),
    []
  )

  const renderEmpty = useCallback(
    () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text fow={500}>Nenhum filme encontrado</Text>
          </View>
        )}
      </View>
    ),
    [isLoading]
  )

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <View testID="movie-list-footer-loading" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 12 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return null
  }, [isFetchingNextPage])

  const keyExtractor = useCallback((item: Movie, index: number) => `${String(item.id)}${index}`, [])

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      if (!isFetchingNextPage) {
        fetchNextPage?.()
      }
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  return (
    <Animated.FlatList
      testID="movie-list"
      keyExtractor={keyExtractor}
      data={isLoading ? [] : data}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      refreshing={refreshingManual}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 10 + bottom,
      }}
      initialNumToRender={limit}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      itemLayoutAnimation={LinearTransition}
    />
  )
}
