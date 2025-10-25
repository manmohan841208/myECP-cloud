'use client'
import React from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar as cal } from '@/assets/svg';
import { InputField } from '../InputField'

export default function DatePicker() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild className='w-full'>
        <InputField 
            label='Date of Birth'
            readOnly 
            value={date ? format(date, 'PPP') : ''} 
            placeholder="Select date"
            iconRight={cal}
            className='w-full cursor-pointer'
        />
      </PopoverTrigger>
      <PopoverContent side='right' className="w-full p-0 bg-white dark:bg-gray-800 box-shadow border-none rounded-[16px]">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            captionLayout='dropdown'
            modifiersClassNames={{
                selected: "outline-none rounded-full border-[2px] border-blue-500",
                today: "font-bold",
            }}
            className="bg-white dark:bg-gray-800 text-black dark:text-white"
            styles={{
                caption: { color: "#4B5563" },
                day: { padding: "0.5rem" },
            }}
            
        />
      </PopoverContent>
    </Popover>
  )
}