'use client'

import Image from 'next/image'
import Badge from './ui/badge'
import { useFetchPoke } from '@/services/poke-list'
import { FilterParams, Poke } from '../../typings'
import { useCallback, useEffect, useState } from 'react'
import Button from './ui/button'
import { useQueryClient } from '@tanstack/react-query'

export function PokeList() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<FilterParams>({ limit: 10, offset: 0 })
  const { data, isLoading } = useFetchPoke(filter)

  const onNext = useCallback(
    () => setFilter(prev => ({ ...prev, offset: prev.offset + 10 })),
    []
  )

  const onPrev = useCallback(
    () => setFilter(prev => ({ ...prev, offset: prev.offset >= 0 ? prev.offset - 10 : 0 })),
    []
  )

  useEffect(() => {
    queryClient.invalidateQueries({ fetchStatus: 'idle' })
  }, [filter, queryClient])

  return (
    <div className='flex flex-col items-start p-4 gap-4'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="name" className='text-sm'>Search pokemon name</label>
        <input type="text" name='name' placeholder='Search' className='outline rounded-sm py-1 px-2' />
      </div>

      <div className='flex items-start flex-wrap gap-4'>
        {isLoading ? (
          <>
            <PokeListItemSkeleton />
            <PokeListItemSkeleton />
            <PokeListItemSkeleton />
          </>
        ) : (
          data?.results.map(item => (
            <PokeListItem key={item.name} data={item} />
          ))
        )}
      </div>

      <div className='self-center flex items-center gap-2'>
        <Button onClick={onPrev} disabled={filter.offset === 0}>
          Prev
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export function PokeListItem({
  data
}: {
  data: Poke
}) {
  const pokeIndex = data.url
    .substring(data.url.indexOf('pokemon'))
    .replaceAll('/', '')
    .replace('pokemon', '')

  return (
    <div className='flex flex-col items-start justify-center bg-accent p-4 rounded'>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_URL}${pokeIndex}.png`}
        height={160}
        width={160}
        alt=''
      />
      <p className='text-sm'>#{pokeIndex}</p>
      <p className='text-2xl mb-1'>{data.name}</p>
      <div className='flex items-center gap-2'>
        <Badge>test</Badge>
        <Badge className='bg-secondary'>test</Badge>
      </div>
    </div>
  )
}

export function PokeListItemSkeleton() {
  return (
    <div className='w-44 h-64 bg-gray-400 animate-pulse' />
  )
}
