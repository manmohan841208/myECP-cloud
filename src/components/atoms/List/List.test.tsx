import React from 'react'
import { render, screen } from '@testing-library/react'
import List from './index'
import '@testing-library/jest-dom'

describe('List Component', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']

    it('renders unordered list by default', () => {
        render(<List items={items.map((item) => <span>{item}</span>)} />)
        const list = screen.getByRole('list')
        expect(list.tagName.toLowerCase()).toBe('ul')
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('renders ordered list when ordered is true', () => {
        render(<List items={items.map((item) => <span>{item}</span>)} ordered />)
        const list = screen.getByRole('list')
        expect(list.tagName.toLowerCase()).toBe('ol')
    })

    it('applies custom class names to list and items', () => {
        render(
            <List
                items={items.map((item) => <span>{item}</span>)}
                className="custom-list"
                itemClassName="custom-item"
            />
        )
        const list = screen.getByRole('list')
        expect(list).toHaveClass('custom-list')

        const listItems = screen.getAllByRole('listitem')
        listItems.forEach((li) => {
            expect(li).toHaveClass('custom-item')
        })
    })
})