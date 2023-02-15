import { ActionType, AppState, AppAction } from '../types';

const initialState: AppState = {
    date: '',
    people: [],
    peopleWithBirthDate: [],
};

const appReducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case ActionType.SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case ActionType.SET_PEOPLE:
            return {
                ...state,
                people: action.payload,
            };
        case ActionType.ADD_PEOPLE_TO_FAVORITES:
            return {
                ...state,
                peopleWithBirthDate: action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;
