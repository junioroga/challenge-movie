import { Select } from '@/components/Select'
import { Text } from '@/components/Text'
import { useWinnersByYear } from '@/hooks'
import { Movie } from '@/hooks/useMovieList/types'
import { useCallback, useMemo, useState } from 'react'
import { ListRenderItem, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { Skeleton } from './Skeleton'
import { WinnersByYearItem } from './WinnersByYearItem'

export const WinnersByYear = () => {
  const [selectedYear, setSelectedYear] = useState(0)
  const year = new Date().getFullYear()
  const yearsList = useMemo(
    () =>
      Array.from({ length: year - 1900 + 1 }, (_, i) => {
        return { label: (year - i).toString(), value: (year - i).toString() }
      }),
    [year]
  )
  const { isLoading, isFetching, data } = useWinnersByYear({ year: selectedYear })

  const renderItem: ListRenderItem<Movie> = useCallback(
    ({ item }) => <WinnersByYearItem item={item} />,
    []
  )

  const renderSeparator = useCallback(() => (
    <View testID="winners-by-year-separator" style={{ width: 10 }} />
  ), []);

  const renderEmpty = useCallback(
    () => (
      <View style={{ height: 80 }}>
        {isLoading && isFetching ? (
          <Skeleton />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text fow={500}>Selecione um ano para filtrar</Text>
          </View>
        )}
      </View>
    ),
    [isLoading, isFetching]
  )

  const keyExtractor = useCallback((item: Movie, index: number) => `${String(item.id)}${index}`, [])

  return (
    <>
      <View style={{ gap: 4, paddingHorizontal: 16, paddingTop: 10 }}>
        <Text fow={500} style={{ fontSize: 16 }}>
          Ano
        </Text>
        <Select value={selectedYear} onValueChange={setSelectedYear} items={yearsList} />
      </View>
      <Animated.FlatList
        testID="winners-by-year-flatlist"
        horizontal
        keyExtractor={keyExtractor}
        data={isLoading ? [] : data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        showsHorizontalScrollIndicator={false}
        itemLayoutAnimation={LinearTransition}
      />
    </>
  )
}
