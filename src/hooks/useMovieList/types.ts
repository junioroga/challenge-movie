export interface Movie {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner: boolean
}

export interface Pageable {
  sort: Sort
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  unsorted: boolean
  sorted: boolean
  empty: boolean
}

export interface MovieData {
  content: Movie[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface MultipleWinnersYears {
  year: number
  winnerCount: number
}

export interface MultipleWinnersData {
  years: MultipleWinnersYears[]
}

export interface Studios {
  name: string
  winCount: number
}

export interface StudiosData {
  studios: Studios[]
}

export interface IntervalAwardsProducers {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}

export interface IntervalAwardsProducersData {
  min: IntervalAwardsProducers[]
  max: IntervalAwardsProducers[]
}

export type Page = {
  page: MovieData
  pageParam: number
}
