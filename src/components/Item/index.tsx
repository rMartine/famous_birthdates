import React, { useState, useEffect } from 'react';
import { Star } from '@mui/icons-material';
import { Person, PersonWithBirthDate } from '../../store/types';

interface Props {
    item: Person;
    list: PersonWithBirthDate[];
    currDate: string;
    updateFavorites: (list: PersonWithBirthDate[]) => void;
}

const Item: React.FC<Props> = ({ item, list, currDate, updateFavorites }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const date = new Date(currDate);

    useEffect(() => {
        setIsFavorite(list.some((person) => person.text === item.text));
    }, [item, list]);

    const handleFavoriteClick = () => {
        const favoriteIndex = list.findIndex((person) => person.text === item.text);
        if (isFavorite && favoriteIndex !== -1) {
            const updatedFavorites = [
                ...list.slice(0, favoriteIndex),
                ...list.slice(favoriteIndex + 1),
            ];
            updateFavorites(updatedFavorites);
        } else if (!isFavorite) {
            const newFavorite = { ...item, day: (date.getDate() + 1), month: (date.getMonth() + 1) };
            const updatedFavorites = [...list, newFavorite];
            updateFavorites(updatedFavorites);
        }
    };
      

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
                onClick={handleFavoriteClick}
                style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                }}
            >
                <Star
                    style={{ color: isFavorite ? 'blue' : 'gray' }}
                />
            </button>
            <div style={{ marginLeft: 8 }}>{item.text}</div>
        </div>
    );
};

export default Item;
