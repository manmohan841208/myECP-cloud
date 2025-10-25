import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomCheckbox from './index'
import '@testing-library/jest-dom'

// Mock Checkbox and Label components
jest.mock('@/components/ui/checkbox', () => ({
    Checkbox: ({ id, checked, onCheckedChange, className }: any) => (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            className={className}
            data-testid="custom-checkbox"
        />
    ),
}))

jest.mock('@/components/ui/label', () => ({
    Label: ({ htmlFor, children, className }: any) => (
        <label htmlFor={htmlFor} className={className}>
            {children}
        </label>
    ),
}))

describe('CustomCheckbox Component', () => {
    it('renders without label', () => {
        render(<CustomCheckbox checked={false} />)
        expect(screen.getByTestId('custom-checkbox')).toBeInTheDocument()
    })

    it('renders with label', () => {
        render(<CustomCheckbox label="Accept Terms" checked={false} />)
        expect(screen.getByText('Accept Terms')).toBeInTheDocument()
    })

    it('calls onChange when clicked', () => {
        const handleChange = jest.fn()
        render(<CustomCheckbox checked={false} onChange={handleChange} />)
        const checkbox = screen.getByTestId('custom-checkbox')
        fireEvent.click(checkbox)
        expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('applies custom className', () => {
        render(<CustomCheckbox className="custom-class" />)
        const wrapper = screen.getByTestId('custom-checkbox').parentElement
        expect(wrapper).toHaveClass('custom-class')
    })
})