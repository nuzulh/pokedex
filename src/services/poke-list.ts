'use client'

import { useQuery } from '@tanstack/react-query'
import { ApiResponse, FilterParams, Poke } from '../../typings'

export function useFetchPoke(filter: FilterParams) {
  return useQuery({
    queryKey: ['GET', 'POKE-LIST'],
    queryFn: async () => {
      const params = new URLSearchParams()
      Object.keys(filter).forEach(x => params.append(x, filter[x as keyof FilterParams] as any))

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}?${params.toString()}`)
      const result = await response.json() as ApiResponse<Poke[]>

      return result
    }
  })
}
