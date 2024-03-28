export type ApiResponse<T> = {
  count: number
  next: string
  previous: string | null
  results: T
}

export type Poke = {
  name: string
  url: string
}

export type FilterParams = {
  limit: number
  offset: number
}
