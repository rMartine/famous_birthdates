/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Item from '../Item';
import { PersonWithBirthDate } from '../../store/types';

describe('Item', () => {
    const item = { text: 'John Doe' };
    const list: PersonWithBirthDate[] = [];
    const currDate = '2022-02-15';
    const updateFavorites = jest.fn();

    it('renders the name of the person', () => {
        const { getByText } = render(<Item item={item} list={list} currDate={currDate} updateFavorites={updateFavorites} />);
        expect(getByText('John Doe')).toBeInTheDocument();
    });

    it('handles favorite button clicks', () => {
        const { getByRole } = render(<Item item={item} list={list} currDate={currDate} updateFavorites={updateFavorites} />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(updateFavorites).toHaveBeenCalledWith([{ text: 'John Doe', day: 16, month: 2 }]);
        fireEvent.click(button);
        expect(updateFavorites).toHaveBeenCalledWith([]);
    });
});
