'use client';
import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar as cal } from '@/assets/svg';
import { InputField } from '../InputField';

type DatePickerProps = {
  value?: string;
  onChange?: (date: string) => void;
  name?: string;
  label?: string;
  error?: string;
};

export default function DatePicker({
  value,
  onChange,
  name,
  label = 'Date of Birth',
  error,
}: DatePickerProps) {
  const [inputValue, setInputValue] = useState(value || '');

  // ✅ Auto-insert slashes for MM/DD/YYYY
  const formatInput = (raw: string) => {
    const digits = raw.replace(/\D/g, ''); // remove non-numeric
    let formatted = digits;

    if (digits.length > 2) {
      formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    if (digits.length > 4) {
      formatted = formatted.slice(0, 5) + '/' + digits.slice(4);
    }
    if (digits.length > 8) {
      formatted = formatted.slice(0, 10); // limit to MM/DD/YYYY
    }

    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatInput(rawValue);
    setInputValue(formatted);
    onChange?.(formatted);
  };

  const handleCalendarSelect = (selectedDate?: Date) => {
    if (selectedDate) {
      const formatted = format(selectedDate, 'MM/dd/yyyy');
      setInputValue(formatted);
      onChange?.(formatted);
    }
  };

  const parsedDate =
    inputValue && /^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)
      ? parse(inputValue, 'MM/dd/yyyy', new Date())
      : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <InputField
            label={label}
            value={inputValue}
            placeholder="MM/DD/YYYY"
            iconRight={cal}
            name={name}
            error={error}
            className="w-full text-left"
            onChange={handleInputChange}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="box-shadow w-full rounded-[16px] border-none bg-white p-0 dark:bg-gray-800"
      >
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={handleCalendarSelect}
          initialFocus
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: 'outline-none rounded-full border-[2px] border-blue-500',
            today: 'font-bold',
          }}
          className="bg-white text-black dark:bg-gray-800 dark:text-white"
          styles={{
            caption: { color: '#4B5563' },
            day: { padding: '0.5rem' },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
