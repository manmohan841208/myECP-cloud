// // components/ui/Carousel.tsx
// 'use client'

// import { useEffect, useState, useCallback } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import clsx from 'clsx'
// import type { ReactNode } from 'react'

// type CarouselImage = ReactNode | string

// type CarouselProps = {
//   images: CarouselImage[]
//   autoScroll?: boolean
//   interval?: number
//   className?: string
// }

// export default function Carousel({
//   images,
//   autoScroll = false,
//   interval = 3000,
//   className = '',
// }: CarouselProps) {
//   const [current, setCurrent] = useState(0)
//   const total = images.length

//   const nextSlide = useCallback(() => {
//     setCurrent((prev) => (prev + 1) % total)
//   }, [total])

//   const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total)

//   useEffect(() => {
//     if (!autoScroll) return
//     const timer = setInterval(nextSlide, interval)
//     return () => clearInterval(timer)
//   }, [autoScroll, interval, nextSlide])

//   return (
//     <div className={clsx('relative w-full overflow-hidden', className)}>
//       {/* Slides */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${current * 100}%)` }}
//       >
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className="w-full flex-shrink-0 object-cover !h-full rounded"
//           >
//             {img}
//           </div>
//         ))}
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow z-10"
//       >
//         <ChevronLeft size={24} />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow z-10"
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Bullets */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={clsx(
//               'w-4 h-4 rounded-full',
//               current === index ? 'bg-white' : 'bg-gray-400'
//             )}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }