import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScrollableList from '../Scroll';
import {ScrollableListItemTypes} from '../../store/types';
import { PersonWithBirthDateGroup, Person } from '../../store/types';

const sampleFavs: PersonWithBirthDateGroup[] = [
    {
        day: 14,
        month: 2,
        text: ['Alice', 'Bob'],
    },
    {
        day: 10,
        month: 3,
        text: ['Charlie'],
    },
];

const samplePersons: Person[] = [
    {
        text: 'Alice',
    },
    {
        text: 'Bob',
    },
    {
        text: 'Charlie',
    },
];

const TestRenderItem: React.FC<any> = ({ item, group }) => {
    if (item) {
        return <div>{item.text}</div>;
    } else {
        return (
            <div>
                {group.month}/{group.day}
            </div>
        );
    }
};

describe('ScrollableList', () => {
    it('renders a list of favorite items', () => {
        render(<ScrollableList RenderItem={TestRenderItem} listFavs={sampleFavs} itemType={ScrollableListItemTypes.FAVS} height='100%' />);
        expect(screen.getByText('February 14')).toBeInTheDocument();
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('March 10')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('renders a list of person items', () => {
        render(
            <ScrollableList
                RenderItem={TestRenderItem}
                listPersons={samplePersons}
                itemType={ScrollableListItemTypes.REGS}
                height='100%'
            />
        );
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('calls the onClickFunction when a person item is clicked', () => {
        const mockOnClick = jest.fn();
        render(
            <ScrollableList
                RenderItem={TestRenderItem}
                listPersons={samplePersons}
                itemType={ScrollableListItemTypes.REGS}
                height='100%'
                onClickFunction={mockOnClick}
            />
        );
        userEvent.click(screen.getByText('Alice'));
        expect(mockOnClick).toHaveBeenCalledWith({ text: 'Alice' });
    });
});
