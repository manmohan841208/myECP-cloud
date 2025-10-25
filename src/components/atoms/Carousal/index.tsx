// components/ui/Carousel.tsx
'use client'

import { useEffect, useState,useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import type { ReactNode } from 'react'

type CarouselImage = ReactNode | string

type CarouselProps = {
  images: CarouselImage[]
  autoScroll?: boolean
  interval?: number
  className?: string
}

export default function Carousel({
  images,
  autoScroll = false,
  interval = 3000,
  className = '',
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  // const nextSlide = () => setCurrent((prev) => (prev + 1) % total)
  
const nextSlide = useCallback(() => {
  setCurrent((prev) => (prev + 1) % total)
}, [total])

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total)

  

useEffect(() => {
  if (!autoScroll) return
  const timer = setInterval(nextSlide, interval)
  return () => clearInterval(timer)
}, [autoScroll, interval, nextSlide])


  return (
    <div className={clsx('relative w-full overflow-hidden', className)}>
      {/* Slides */}
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="w-full flex-shrink-0 object-cover !h-full rounded">
            {img}
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronRight size={20} />
      </button>

      {/* Bullets */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={clsx(
              'w-3 h-3 rounded-full',
              current === index ? 'bg-white' : 'bg-[#7D7D7D7A]'
            )}
          />
        ))}
      </div>
    </div>
  )
}