import { useMemo, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { useMovieList } from '@/hooks'

import { Select } from '@/components/Select'
import { Text } from '@/components/Text'
import { View } from 'react-native'
import { MovieList } from './MovieList'

export const Movies = () => {
  const queryClient = useQueryClient()
  const [refreshingManual, setRefreshingManual] = useState(false)
  const [selectedYear, setSelectedYear] = useState('')
  const [isWinner, setIsWinner] = useState('')
  const year = new Date().getFullYear()
  const yearsList = useMemo(
    () =>
      Array.from({ length: year - 1900 + 1 }, (_, i) => {
        return { label: (year - i).toString(), value: (year - i).toString() }
      }),
    [year]
  )

  const { refetch, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, data } =
    useMovieList({
      limit: 10,
      winner: isWinner,
      year: Number(selectedYear),
    })

  const refetchQuery = () => {
    queryClient.removeQueries({ queryKey: ['movie-list'] })
    refetch()
  }

  const onRefresh = () => {
    if (data?.pages.length) {
      setRefreshingManual(true)
      refetchQuery()
      setRefreshingManual(false)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 12, gap: 8, paddingBottom: 16 }}>
        <View style={{ gap: 4 }}>
          <Text fow={500} style={{ fontSize: 16 }}>
            Ano
          </Text>
          <Select value={selectedYear} onValueChange={setSelectedYear} items={yearsList} />
        </View>
        <View style={{ gap: 4 }}>
          <Text fow={500} style={{ fontSize: 16 }}>
            Vencedor?
          </Text>
          <Select
            value={isWinner}
            onValueChange={setIsWinner}
            items={[
              { label: 'Sim', value: 'sim' },
              { label: 'Não', value: 'não' },
            ]}
          />
        </View>
      </View>
      <MovieList
        isLoading={isFetching && !isFetchingNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        data={data?.pages}
        onRefresh={onRefresh}
        refreshingManual={refreshingManual}
        limit={10}
      />
    </View>
  )
}
