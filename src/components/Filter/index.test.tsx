/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter from './index';

describe('Filter component', () => {
    const mockUpdateResults = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByTitle } = render(<Filter date='2023-02-15' updateResults={mockUpdateResults} />);
        const dateText = getByText('Birthdays on February 15');
        const searchInput = getByTitle('filterInput');
        expect(dateText).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
    });

    it('updates search term when input changes', () => {
        const { getByTitle } = render(<Filter date='2023-02-15' updateResults={mockUpdateResults} />);
        const searchInput = getByTitle('filterInput');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        expect(searchInput.getAttribute('value')).toBe('John');
    });

    it('only allows alphabetical characters in search input', () => {
        const { getByTitle } = render(<Filter date='2023-02-15' updateResults={mockUpdateResults} />);
        const searchInput = getByTitle('filterInput');
        fireEvent.change(searchInput, { target: { value: '123' } });
        expect(searchInput.getAttribute('value')).toBe('');
        fireEvent.change(searchInput, { target: { value: 'Hello World' } });
        expect(searchInput.getAttribute('value')).toBe('Hello World');
    });

    it('calls updateResults with search term when input changes', () => {
        const { getByTitle } = render(<Filter date='2023-02-15' updateResults={mockUpdateResults} />);
        const searchInput = getByTitle('filterInput');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        expect(mockUpdateResults).toHaveBeenCalledTimes(1);
        expect(mockUpdateResults).toHaveBeenCalledWith('John');
    });
});
