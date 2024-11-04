import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

export const useIntervalAwardsProducers = () => {
  const getIntervalAwardsProducers = async () => {
    const data = await movieService.getIntervalAwardsProducers({
      projection: 'max-min-win-interval-for-producers',
    })

    return data
  }

  return useQuery({
    queryKey: ['interval-awards-producers'],
    queryFn: getIntervalAwardsProducers,
    staleTime: Infinity,
  })
}
