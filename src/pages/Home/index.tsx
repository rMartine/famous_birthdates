import React, { CSSProperties, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, addPeopleToFavorites } from '../../store/actions/';
import { AppState, Person, PersonWithBirthDate, PersonWithBirthDateGroup, ScrollableListItemTypes } from '../../store/types';
import Calendar from '../../components/Calendar';
import Filter from '../../components/Filter';
import Item from '../../components/Item';
import ItemFavs from '../../components/ItemFavs';
import Scroll from '../../components/Scroll';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    // TODO: Move the selector functions to the store
    const date = useSelector((state: AppState) => state.date);
    const people = useSelector((state: AppState) => state.people);
    const [cpyPeople, setCpyPeople] = useState([] as Person[]);
    const peopleWithBirthDate = useSelector((state: AppState) => state.peopleWithBirthDate);

    useEffect(() => {
        dispatch(fetchPeople(date));
    }, [date, dispatch]);

    useEffect(() => {
        setCpyPeople(people);
    }, [people])

    const handleFilter = (searchTerm: string) => {
        if (!searchTerm || searchTerm.trim() === '') {
            setCpyPeople(people);
        } else {
            setCpyPeople(people.filter((item) => item?.text?.includes(searchTerm)));
        }
    };

    const handleUpdateFavorites = (list: PersonWithBirthDate[]) => {
        dispatch(addPeopleToFavorites(list));
    };

    const groupByDate = (
        people: PersonWithBirthDate[]
    ): PersonWithBirthDateGroup[] => {
        const groups: Record<string, PersonWithBirthDateGroup> = {};

        for (const person of people) {
            const { text, month, day } = person;
            const key: string = `${month}-${day}`;
            if (!groups[key]) {
                groups[key] = { month, day, text: [] };
            }
            groups[key].text.push(text ? text : '');
        }

        return Object.values(groups);
    }

    return (
        <div style={style}>
            <div>
                <Calendar />
                <Filter
                    date={date}
                    updateResults={handleFilter}
                />
                <Scroll
                    RenderItem={Item}
                    itemType={ScrollableListItemTypes.REGS}
                    listPersons={cpyPeople}
                    listFavs={peopleWithBirthDate}
                    currDate={date}
                    updateFavorites={handleUpdateFavorites}
                    height="25%"
                />
            </div>
            <div style={{paddingLeft: 25}}>
                <Scroll
                    RenderItem={ItemFavs}
                    itemType={ScrollableListItemTypes.FAVS}
                    listFavs={groupByDate(peopleWithBirthDate)}
                    height="100%"
                />
            </div>
        </div>
    );
};

export default Home;

const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    height: '100vh',
    width: '100vw',
};
