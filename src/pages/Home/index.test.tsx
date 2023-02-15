import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home component', () => {
    it('renders without crashing', () => {
        render(<Home />);
        const element = screen.getByTestId('home-component');
        expect(element).toBeInTheDocument();
    });

    it('displays the Filter component', () => {
        render(<Home />);
        const element = screen.getByTestId('filter-component');
        expect(element).toBeInTheDocument();
    });

    it('displays the Scroll component', () => {
        render(<Home />);
        const element = screen.getByTestId('scroll-component');
        expect(element).toBeInTheDocument();
    });
});