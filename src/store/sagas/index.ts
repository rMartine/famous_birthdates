import { call, put, takeLatest } from 'redux-saga/effects';
import { setPeople } from '../actions';
import { ActionType, Person } from '../types';
import { BASE_API_URL } from '../../constants/config';


// TODO: Add diferent states for the api call like success, error, pending, that would allow to show the user when the data is loading.
// Fetch the list of people from the API and dispatches a SET_PEOPLE action
function* handleFetchPeopleByDate(action: {
    type: ActionType.FETCH_PEOPLE;
    payload: string;
}): Generator<any>{
    try {
        const { payload } = action;
        const [, month, day] = payload.split("-");
        const response: Response = (yield call(fetch, `${BASE_API_URL}/${month}/${day}`)) as Response;
        const jsonData: any = yield response.json();
        const peopleBirths: any = jsonData.births;
        const people: Person[] = (yield peopleBirths.map((item: any): Person => {
            return { text: item ? item.text : undefined };
        })) as Person[];
        yield put(setPeople(people));
    } catch (error) {
        console.error('Failed to fetch the list of people by birthday', error);
    }
}


// Adding fetch people to the root saga.
export function* rootSaga() {
    yield takeLatest(ActionType.FETCH_PEOPLE, handleFetchPeopleByDate);
}

