import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './store/reducers/index';
import { rootSaga } from './store/sagas/index';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);