import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomTabs from './index'
import '@testing-library/jest-dom'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Plus: (props: any) => <svg data-testid="plus-icon" {...props} />,
    Minus: (props: any) => <svg data-testid="minus-icon" {...props} />,
}))

describe('CustomTabs Component', () => {
    it('renders all tabs', () => {
        render(<CustomTabs />)
        expect(screen.getByText('Recent Activity')).toBeInTheDocument()
        expect(screen.getByText('Payment History')).toBeInTheDocument()
        expect(screen.getByText('Statements')).toBeInTheDocument()
        expect(screen.getByText('Rewards Activity')).toBeInTheDocument()
    })

    it('shows Minus icon for active tab and Plus for others', () => {
        render(<CustomTabs />)
        expect(screen.getAllByTestId('plus-icon').length).toBe(3)
        expect(screen.getByTestId('minus-icon')).toBeInTheDocument()
    })

    it('changes active tab on click', () => {
        render(<CustomTabs />)
        const statementsTab = screen.getByText('Statements')
        fireEvent.click(statementsTab)

        // After clicking, Statements should be active
        expect(screen.getByTestId('minus-icon')).toBeInTheDocument()
        expect(statementsTab.parentElement).toHaveClass('bg-[var(--selected-tab-background)]')
    })
})