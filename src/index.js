import React from 'react';
import ReactDOM from 'react-dom';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const middlewares = [ReduxPromise, thunkMiddleware]

const enhancer = compose(
  applyMiddleware(...middlewares),
  persistState('auth', { key: 'AUTH' }),
  persistState('site', { key: 'SITE' }),
  persistState('error', { key: 'ERROR' }),
  persistState('property', { key: 'PROPERTY' }),
  persistState('user', { key: 'USER' }),
)

const store = createStore(reducers, {}, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
