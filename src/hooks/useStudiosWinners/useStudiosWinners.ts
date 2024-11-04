import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

export const useStudiosWinners = () => {
  const getStudiosWinners = async () => {
    const data = await movieService.getStudiosWinners({
      projection: 'studios-with-win-count',
    })

    return data
  }

  return useQuery({
    queryKey: ['studios-winners'],
    queryFn: getStudiosWinners,
    staleTime: Infinity,
  })
}
