import React from 'react'
import { render } from '@testing-library/react'
import Icon from './index'
import '@testing-library/jest-dom'

// ✅ Correctly mock Next.js Image component
jest.mock('next/image', () => (props: any) => {
    return <img {...props} />
})

describe('SvgIcon Component', () => {
    it('renders correctly with default props', () => {
        const { getByAltText } = render(<Icon name="test-icon" />)
        const img = getByAltText('test-icon') as HTMLImageElement

        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/icons/test-icon.svg')
        expect(img).toHaveAttribute('width', '24')
        expect(img).toHaveAttribute('height', '24')
    })

    it('renders with custom size and alt text', () => {
        const { getByAltText } = render(
            <Icon name="custom-icon" size={48} alt="Custom Icon" />
        )
        const img = getByAltText('Custom Icon') as HTMLImageElement
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('width', '48')
        expect(img).toHaveAttribute('height', '48')
    })

    it('applies custom className', () => {
        const { getByAltText } = render(
            <Icon name="styled-icon" className="my-icon-class" />
        )
        const img = getByAltText('styled-icon')

        expect(img).toHaveClass('my-icon-class')
    })
})