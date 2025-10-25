import React from 'react'
import { render, screen } from '@testing-library/react'
import { InputField } from './index'
import '@testing-library/jest-dom'

// ✅ Correctly mock dependencies
jest.mock('@/components/atoms/Image/index', () => (props: any) => <img {...props} />)
jest.mock('@/components/atoms/Tooltip/index', () => ({
    DynamicTooltip: ({ children }: any) => <div>{children}</div>,
}))
jest.mock('@/assets/svg', () => ({
    TooltipBlue: 'tooltip-blue.svg',
}))

describe('InputField Component', () => {
    it('renders with label and mandatory indicator', () => {
        render(<InputField label="Username" mandantory />)
        expect(screen.getByText('Username')).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('renders with left and right icons', () => {
        render(
            <InputField
                name="email"
                iconLeft={<span data-testid="icon-left">L</span>}
                iconRight="icon-right.svg"
            />
        )
        expect(screen.getByTestId('icon-left')).toBeInTheDocument()
        expect(screen.getByAltText('img')).toHaveAttribute('src', 'icon-right.svg')
    })

    it('renders error message and applies error styles', () => {
        render(<InputField name="email" error="Invalid email" />)
        expect(screen.getByText('Invalid email')).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
})