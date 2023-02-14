import { ActionType, AppAction, Person, PersonWithBirthDate } from '../types';

export const setDate = (date: string): AppAction => ({
    type: ActionType.SET_DATE,
    payload: date,
});

export const fetchPeople = (dateString: string): AppAction => ({
    type: ActionType.FETCH_PEOPLE,
    payload: dateString,
});

export const setPeople = (people: Person[]): AppAction => ({
    type: ActionType.SET_PEOPLE,
    payload: people,
});

export const addPeopleToFavorites = (
    peopleWithBirthDate: PersonWithBirthDate[]
): AppAction => ({
    type: ActionType.ADD_PEOPLE_TO_FAVORITES,
    payload: peopleWithBirthDate,
});
