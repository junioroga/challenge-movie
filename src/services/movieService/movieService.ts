import {
  IntervalAwardsProducersData,
  Movie,
  MovieData,
  MultipleWinnersData,
  StudiosData,
} from '@/hooks/useMovieList/types'
import { api } from '@/config/api'

import { PaginationProps } from '../types'

interface GetMoviesProps extends PaginationProps {
  winner?: string
  year?: number
}

interface GetMultipleWinnersProps {
  projection: 'years-with-multiple-winners'
}
interface GetStudiosProps {
  projection: 'studios-with-win-count'
}
interface GetIntervalAwardsProducersProps {
  projection: 'max-min-win-interval-for-producers'
}

interface GetWinnerByYearProps {
  year: number
}

const getMovies = async (options: GetMoviesProps): Promise<MovieData> => {
  const params = []
  let paramsQs = ''

  if (options.page >= 0) {
    params.push(`page=${options.page}`)
  }

  if (options.size >= 0) {
    params.push(`size=${options.size}`)
  }

  if (options.winner) {
    params.push(`winner=${options.winner === 'sim'}`)
  }

  if (options.year) {
    params.push(`year=${options.year}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<MovieData>(paramsQs)

  return response.data
}

const getMultipleWinners = async (
  options: GetMultipleWinnersProps
): Promise<MultipleWinnersData> => {
  const params = []
  let paramsQs = ''

  if (options.projection) {
    params.push(`projection=${options.projection}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<MultipleWinnersData>(paramsQs)

  return response.data
}

const getStudiosWinners = async (options: GetStudiosProps): Promise<StudiosData> => {
  const params = []
  let paramsQs = ''

  if (options.projection) {
    params.push(`projection=${options.projection}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<StudiosData>(paramsQs)

  return response.data
}

const getIntervalAwardsProducers = async (
  options: GetIntervalAwardsProducersProps
): Promise<IntervalAwardsProducersData> => {
  const params = []
  let paramsQs = ''

  if (options.projection) {
    params.push(`projection=${options.projection}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<IntervalAwardsProducersData>(paramsQs)

  return response.data
}

const getWinnerByYear = async (options: GetWinnerByYearProps): Promise<Movie[]> => {
  const params = []
  let paramsQs = ''

  if (options.year > 0) {
    params.push(`winner=true`)
    params.push(`year=${options.year}`)
  }

  if (params.length) {
    paramsQs = `?${params.join('&')}`
  }

  const response = await api.get<Movie[]>(paramsQs)

  return response.data
}

export {
  getMovies,
  getMultipleWinners,
  getStudiosWinners,
  getIntervalAwardsProducers,
  getWinnerByYear,
}
