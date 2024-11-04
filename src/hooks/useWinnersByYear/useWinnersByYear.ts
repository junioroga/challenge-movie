import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

export const useWinnersByYear = ({ year }: { year: number }) => {
  const getWinnersByYear = async ({ queryKey }: QueryFunctionContext) => {
    const [, { year }] = queryKey as [string, { year: number }]
    const data = await movieService.getWinnerByYear({
      year,
    })

    return data
  }

  return useQuery({
    queryKey: ['winners-by-year', { year }],
    queryFn: getWinnersByYear,
    staleTime: Infinity,
    enabled: year > 1900,
  })
}
