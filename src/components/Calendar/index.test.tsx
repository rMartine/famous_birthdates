import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendar from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('Calendar', () => {
  it('should render a date picker', () => {
    render(
      <Provider store={mockStore()}>
        <Calendar />
      </Provider>
    );
    expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
  });

  it('should dispatch setDate when a date is selected', () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Calendar />
      </Provider>
    );
    const date = screen.getByLabelText('Choose date');
    userEvent.click(date);
    userEvent.click(screen.getByText('7'));
    userEvent.click(screen.getByText('April'));
    userEvent.click(screen.getByText('2022'));
    expect(store.getActions()).toEqual([{ type: 'SET_DATE', payload: '2022-04-07' }]);
  });
});
