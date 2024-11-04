import { useInfiniteQuery } from '@tanstack/react-query'
import flatMap from 'lodash/flatMap'

import { movieService } from '@/services'

type MovieListHookProps = {
  winner?: string
  year?: number
  limit?: number
}

export const useMovieList = ({ winner, year, limit = 10 }: MovieListHookProps) => {
  const getListMovies = async ({ pageParam = 0 }) => {
    const data = await movieService.getMovies({
      winner,
      year,
      size: limit,
      page: pageParam,
    })

    return {
      data,
      nextPage: pageParam + 1,
    }
  }

  return useInfiniteQuery(['movie-list', year, winner], getListMovies, {
    select: (data) => {
      const flattenData = flatMap(data?.pages, (page) => page.data)
      const movieData = flatMap(flattenData, (page) => page.content)

      return {
        pages: movieData,
        pageParams: data.pageParams,
      }
    },
    getNextPageParam: (lastPage) => (!lastPage?.data?.last ? lastPage.nextPage : false),
    staleTime: Infinity,
  })
}
