import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

export const useMultipleWinners = () => {
  const getMultipleWinners = async () => {
    const data = await movieService.getMultipleWinners({
      projection: 'years-with-multiple-winners',
    })

    return data
  }

  return useQuery({
    queryKey: ['multiple-winners'],
    queryFn: getMultipleWinners,
    staleTime: Infinity,
  })
}
