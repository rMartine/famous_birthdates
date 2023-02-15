export enum ScrollableListItemTypes {
    FAVS = 'FAVS',
    REGS = 'REGS',
}

export interface ScrollableListItem {
    type: ScrollableListItemTypes.FAVS | ScrollableListItemTypes.REGS;
}

export interface Person {
    text?: string;
}

export interface PersonWithBirthDate extends Person {
    day: number;
    month: number;
}

export interface PersonWithBirthDateGroup {
    day: number;
    month: number;
    text: string[];
}

export interface AppState {
    date: string;
    people: Person[];
    peopleWithBirthDate: PersonWithBirthDate[];
}

export enum ActionType {
    SET_DATE = 'SET_DATE',
    FETCH_PEOPLE = 'FETCH_PEOPLE',
    SET_PEOPLE = 'SET_PEOPLE',
    ADD_PEOPLE_TO_FAVORITES = 'ADD_PEOPLE_TO_FAVORITES',
}

interface SetDateAction {
    type: ActionType.SET_DATE;
    payload: string;
}

interface FetchPeopleAction {
    type: ActionType.FETCH_PEOPLE;
    payload: string;
}

interface SetPeopleAction {
    type: ActionType.SET_PEOPLE;
    payload: Person[];
}

interface AddPeopleToFavorites {
    type: ActionType.ADD_PEOPLE_TO_FAVORITES;
    payload: PersonWithBirthDate[];
}

export type AppAction =
    | SetDateAction
    | FetchPeopleAction
    | SetPeopleAction
    | AddPeopleToFavorites;
