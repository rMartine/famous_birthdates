import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, setDate, addPeopleToFavorites } from '../../store/actions/';
import { AppState, Person, PersonWithBirthDate } from '../../store/types';

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const date = useSelector((state: AppState) => state.date);
    const people = useSelector((state: AppState) => state.people);
    const peopleWithBirthDate = useSelector((state: AppState) => state.peopleWithBirthDate);
    const tempDate = '2023-02-14';

    useEffect(() => {
        dispatch(fetchPeople(date));
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: add a way to force the date to be in the format {MM}/{day}
        dispatch(setDate(event.target.value));
    };

    const handleAddToFavorites = (aPerson: PersonWithBirthDate) => {
        peopleWithBirthDate.push(aPerson);
        dispatch(addPeopleToFavorites(peopleWithBirthDate));
    };

    return (
        <div>
            <input type="date" value={date} onChange={handleDateChange} />
            <ul>
                {people.map((person: Person) => (
                    <li key={person.text}>
                        {`${person.text}`}
                    </li>
                ))}
            </ul>
            <button onClick={() => {
                // TODO: UI to handle events for adding people to favorites
                console.log('Adding person');
            }}>Add People with Birth Date</button>
            <ul>
                {peopleWithBirthDate.map((person: PersonWithBirthDate) => (
                    <li key={person.text}>
                        {`${person.text}`}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
