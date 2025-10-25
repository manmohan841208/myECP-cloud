import React from 'react'
import { render, screen } from '@testing-library/react'
import Image from './index'
import '@testing-library/jest-dom'

// ✅ Correctly mock Next.js Image component
jest.mock('next/image', () => (props: any) => {
    return <img {...props} data-testid="next-image" />
})

describe('Image Component', () => {
    it('renders with required props', () => {
        render(<Image src="/test.jpg" alt="Test Image" width={100} height={100} className="custom-class" />)
        const img = screen.getByTestId('next-image')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/test.jpg')
        expect(img).toHaveAttribute('alt', 'Test Image')
    })

    it('applies className correctly', () => {
        render(<Image src="/test.jpg" alt="Test Image" width={100} height={100} className="custom-class" />)
        const img = screen.getByTestId('next-image')
        expect(img).toHaveClass('custom-class')
    })
})