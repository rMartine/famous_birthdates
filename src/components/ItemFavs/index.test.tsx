import { render, screen } from '@testing-library/react';
import ItemFavs from '../ItemFavs';

describe('ItemFavs', () => {
    const mockGroup = {
        day: 15,
        month: 2,
        text: ['John Doe', 'Jane Smith'],
    };

    it('should render the correct month and day', () => {
        render(<ItemFavs group={mockGroup} />);
        expect(screen.getByText('February 15')).toBeInTheDocument();
    });

    it('should render the correct names', () => {
        render(<ItemFavs group={mockGroup} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should render a list item with the correct structure', () => {
        render(<ItemFavs group={mockGroup} />);
        const listItem = screen.getByRole('listitem');
        expect(listItem).toContainElement(screen.getByText('February 15'));
        expect(listItem).toContainElement(screen.getByText('John Doe'));
        expect(listItem).toContainElement(screen.getByText('Jane Smith'));
    });
});
