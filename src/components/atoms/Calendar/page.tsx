// 'use client';
// import React, { useState } from 'react';
// import { addYears, format, isAfter, isBefore, parse } from 'date-fns';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover';
// import { Button } from '@/components/ui/button';
// import { Calendar as cal } from '@/assets/svg';
// import { InputField } from '../InputField';

// type DatePickerProps = {
//   value?: string;
//   onChange?: (date: string) => void;
//   name?: string;
//   label?: string;
//   error?: string;
//   apiError?: boolean;
//   iconRight?: React.ReactNode;
// };

// export default function DatePicker({
//   value,
//   onChange,
//   name,
//   label = 'Date of Birth',
//   error,
//   apiError,
//   iconRight,
// }: DatePickerProps) {
//   // Controlled state for the popover
//   const [open, setOpen] = useState(false);

//   // Temporary state for the date inside the popover
//   const [tempDate, setTempDate] = useState<Date | undefined>(
//     value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)
//       ? parse(value, 'MM/dd/yyyy', new Date())
//       : undefined,
//   );

//   const [inputValue, setInputValue] = useState(value || '');

//   const formatInput = (raw: string) => {
//     const digits = raw.replace(/\D/g, '');
//     let formatted = digits;

//     if (digits.length > 2) {
//       formatted = digits.slice(0, 2) + '/' + digits.slice(2);
//     }
//     if (digits.length > 4) {
//       formatted = formatted.slice(0, 5) + '/' + digits.slice(4);
//     }
//     if (digits.length > 8) {
//       formatted = formatted.slice(0, 10);
//     }

//     return formatted;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const rawValue = e.target.value;
//     const formatted = formatInput(rawValue);
//     setInputValue(formatted);
//     // Do not trigger onChange for external forms until OK is clicked
//   };

//   const handleCalendarSelect = (selectedDate?: Date) => {
//     setTempDate(selectedDate);
//   };

//   const handleOpenChange = (newOpen: boolean) => {
//     setOpen(newOpen);
//     // Reset temp date if popover is closing
//     if (!newOpen) {
//       setTempDate(
//         inputValue && /^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)
//           ? parse(inputValue, 'MM/dd/yyyy', new Date())
//           : undefined,
//       );
//     }
//   };

//   const handleOk = () => {
//     if (tempDate) {
//       const formatted = format(tempDate, 'MM/dd/yyyy');
//       setInputValue(formatted);
//       onChange?.(formatted);
//     } else {
//       setInputValue('');
//       onChange?.('');
//     }
//     setOpen(false); // Close the popover
//   };

//   const handleCancel = () => {
//     setOpen(false); // Close the popover
//   };

//   const parsedDate =
//     inputValue && /^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)
//       ? parse(inputValue, 'MM/dd/yyyy', new Date())
//       : undefined;

//   return (
//     <Popover open={open} onOpenChange={handleOpenChange}>
//       <PopoverTrigger asChild>
//         <div className="w-full">
//           <InputField
//             onClick={(e) => e.stopPropagation()}
//             label={label}
//             value={inputValue}
//             placeholder="MM/DD/YYYY"
//             iconRight={iconRight ? iconRight : cal}
//             name={name}
//             error={error}
//             className="w-full text-left"
//             onChange={handleInputChange}
//             apiError={apiError}
//           />
//         </div>
//       </PopoverTrigger>
//       <PopoverContent
//         side="right"
//         className="box-shadow w-full rounded-[16px] border-none bg-white p-0 dark:bg-gray-800"
//       >
//         <Calendar
//           mode="single"
//           selected={tempDate} // Use tempDate for the calendar display
//           onSelect={handleCalendarSelect} // Update tempDate on selection
//           initialFocus
//           captionLayout="dropdown"
//           modifiersClassNames={{
//             selected: 'outline-none rounded-full border-[2px] border-blue-500',
//             today: 'font-bold',
//           }}
//           className="bg-white text-black dark:bg-gray-800"
//           styles={{
//             caption: { color: '#4B5563' },
//             day: { padding: '0.5rem' },
//           }}
//           toYear={new Date().getFullYear() - 18} // ✅ restrict dropdown to valid years
//           disabled={(date) => {
//             const today = new Date();
//             const eighteenYearsAgo = addYears(today, -18);
//             // ✅ Disable if date is after (younger than 18)
//             return isAfter(date, eighteenYearsAgo);
//           }}
//         />
//         {/* Calendar Footer with Cancel and OK buttons */}
//         <div className="flex h-[60px] items-center justify-end">
//           <div
//             className="cursor-pointer px-5 text-[var(--color-blue)]"
//             onClick={handleCancel}
//           >
//             Cancel
//           </div>
//           <div
//             className="cursor-pointer px-5 text-[var(--color-blue)]"
//             onClick={handleOk}
//           >
//             OK
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
'use client';
import React, { useState } from 'react';
import { format, parse, isValid, addYears, isAfter } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as cal } from '@/assets/svg';
import { InputField } from '../InputField';

type DatePickerProps = {
  value?: string;
  onChange?: (date: string) => void;
  name?: string;
  label?: string;
  error?: string;
  apiError?: boolean;
  iconRight?: React.ReactNode;
};

export default function DatePicker({
  value,
  onChange,
  name,
  label = 'Date of Birth',
  error,
  apiError,
  iconRight,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(
    value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)
      ? parse(value, 'MM/dd/yyyy', new Date())
      : undefined,
  );
  const [inputValue, setInputValue] = useState(value || '');

  const formatInput = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    let formatted = digits;

    if (digits.length > 2) {
      formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    if (digits.length > 4) {
      formatted = formatted.slice(0, 5) + '/' + digits.slice(4);
    }
    if (digits.length > 8) {
      formatted = formatted.slice(0, 10);
    }

    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatInput(rawValue);
    setInputValue(formatted);

    // Trigger onChange if the input is a valid date
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) {
      const parsed = parse(formatted, 'MM/dd/yyyy', new Date());
      if (isValid(parsed)) {
        setTempDate(parsed);
        onChange?.(formatted);
      }
    }
  };

  const handleCalendarSelect = (selectedDate?: Date) => {
    setTempDate(selectedDate);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTempDate(
        inputValue && /^\d{2}\/\d{2}\/\d{4}$/.test(inputValue)
          ? parse(inputValue, 'MM/dd/yyyy', new Date())
          : undefined,
      );
    }
  };

  const handleOk = () => {
    if (tempDate) {
      const formatted = format(tempDate, 'MM/dd/yyyy');
      setInputValue(formatted);
      onChange?.(formatted);
    } else {
      setInputValue('');
      onChange?.('');
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="w-full">
          <InputField
            onClick={(e) => e.stopPropagation()}
            label={label}
            value={inputValue}
            placeholder="MM/DD/YYYY"
            name={name}
            error={error}
            className="w-full text-left"
            iconRight={iconRight ? iconRight : cal}
            onChange={handleInputChange}
            apiError={apiError}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        className="box-shadow w-full rounded-[16px] border-none bg-white p-0 dark:bg-gray-800"
      >
        <Calendar
          mode="single"
          selected={tempDate}
          onSelect={handleCalendarSelect}
          initialFocus
          captionLayout="dropdown"
          modifiersClassNames={{
            selected: 'outline-none rounded-full border-[2px] border-blue-500',
            today: 'font-bold',
          }}
          className="bg-white text-black dark:bg-gray-800"
          styles={{
            caption: { color: '#4B5563' },
            day: { padding: '0.5rem' },
          }}
          toYear={new Date().getFullYear() - 18} // ✅ restrict dropdown to valid years
          disabled={(date) => {
            const today = new Date();
            const eighteenYearsAgo = addYears(today, -18);
            // ✅ Disable if date is after (younger than 18)
            return isAfter(date, eighteenYearsAgo);
          }}
        />
        <div className="flex h-[60px] items-center justify-end">
          <div
            className="cursor-pointer px-5 text-[var(--color-blue)]"
            onClick={handleCancel}
          >
            Cancel
          </div>
          <div
            className="cursor-pointer px-5 text-[var(--color-blue)]"
            onClick={handleOk}
          >
            OK
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
