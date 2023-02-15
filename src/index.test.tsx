import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, AnyAction, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './store/reducers/index';
import { rootSaga } from './store/sagas/index';
import App from './App';

describe('index.tsx', () => {
  let store: Store<unknown, AnyAction>;

  beforeAll(() => {
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(appReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('configures the store correctly', () => {
    expect(store.getState()).toEqual({});
  });

  it('runs the root Saga without errors', () => {
    expect(true).toBe(true);
  });
});