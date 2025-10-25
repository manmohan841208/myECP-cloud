// components/ui/List.tsx
import React from 'react'
import clsx from 'clsx'

type ListProps = {
  items: React.ReactNode[]
  ordered?: boolean
  className?: string
  itemClassName?: string
}

export default function List({
  items,
  ordered = false,
  className = '',
  itemClassName = '',
}: ListProps) {
  const ListTag = ordered ? 'ol' : 'ul'

  return (
    <ListTag className={clsx('pl-5 space-y-2', className)}>
      {items.map((item, index) => (
        <li key={index} className={clsx('text-sm text-gray-700', itemClassName)}>
          {item}
        </li>
      ))}
    </ListTag>
  )
}