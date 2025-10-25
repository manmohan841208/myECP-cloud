import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Carousel from './index'
import '@testing-library/jest-dom'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    ChevronLeft: (props: any) => <button {...props} data-testid="chevron-left">{"<"}</button>,
    ChevronRight: (props: any) => <button {...props} data-testid="chevron-right">{">"}</button>,
}))

describe('Carousel Component', () => {
    const images = [
        <div data-testid="slide">Slide 1</div>,
        <div data-testid="slide">Slide 2</div>,
        <div data-testid="slide">Slide 3</div>,
    ]

    it('renders all slides', () => {
        render(<Carousel images={images} />)
        const slides = screen.getAllByTestId('slide')
        expect(slides.length).toBe(3)
    })

    it('navigates to next and previous slides', () => {
        render(<Carousel images={images} />)

        const nextButton = screen.getByTestId('chevron-right')
        const prevButton = screen.getByTestId('chevron-left')

        // Click next
        fireEvent.click(nextButton)
        expect(screen.getByText('Slide 2')).toBeInTheDocument()

        // Click previous
        fireEvent.click(prevButton)
        expect(screen.getByText('Slide 1')).toBeInTheDocument()
    })

    it('navigates using bullets', () => {
        render(<Carousel images={images} />)
        const bullets = screen.getAllByRole('button')

        // Last 3 buttons are bullets (after 2 arrow buttons)
        const bulletButtons = bullets.slice(-3)

        fireEvent.click(bulletButtons[2])
        expect(screen.getByText('Slide 3')).toBeInTheDocument()
    })

    it('auto-scrolls when enabled', () => {
        jest.useFakeTimers()
        render(<Carousel images={images} autoScroll interval={1000} />)

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(screen.getByText('Slide 2')).toBeInTheDocument()

        act(() => {
            jest.advanceTimersByTime(1000)
        })
        expect(screen.getByText('Slide 3')).toBeInTheDocument()

        jest.useRealTimers()
    })
})