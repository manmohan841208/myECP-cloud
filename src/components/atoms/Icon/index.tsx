// components/SvgIcon.tsx
import React from 'react'
import Image from 'next/image'

type IconProps = {
  name: string // filename without extension
  size?: number
  className?: string
  alt?: string
}

export default function Icon({
  name,
  size = 24,
  className = '',
  alt = '',
}: IconProps) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt={alt || name}
      width={size}
      height={size}
      className={className}
    />
  )
}