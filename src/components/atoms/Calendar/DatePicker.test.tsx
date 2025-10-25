import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DatePicker from './page'
import '@testing-library/jest-dom'

// Mock dependencies
jest.mock('@/components/ui/calendar', () => ({
    Calendar: ({ onSelect }: any) => (
        <div>
            <button onClick={() => onSelect(new Date('2000-01-01'))} data-testid="calendar-day">
                Select Date
            </button>
        </div>
    ),
}))

jest.mock('@/components/ui/popover', () => ({
    Popover: ({ children }: any) => <div>{children}</div>,
    PopoverTrigger: ({ children }: any) => <div>{children}</div>,
    PopoverContent: ({ children }: any) => <div>{children}</div>,
}))

jest.mock('@/assets/svg', () => ({
    Calendar: 'calendar-icon.svg',
}))

jest.mock('../InputField', () => ({
    InputField: ({ value, placeholder, iconRight }: any) => (
        <input
            readOnly
            value={value}
            placeholder={placeholder}
            data-testid="date-input"
            alt={iconRight}
        />
    ),
}))

describe('DatePicker Component', () => {
    it('renders input with placeholder', () => {
        render(<DatePicker />)
        const input = screen.getByTestId('date-input')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('placeholder', 'Select date')
    })

    it('updates input value when a date is selected', () => {
        render(<DatePicker />)
        const selectButton = screen.getByTestId('calendar-day')
        fireEvent.click(selectButton)

        const input = screen.getByTestId('date-input')
        expect(input).toHaveValue('January 1st, 2000') // formatted using 'PPP'
    })
})