import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { createStore, AnyAction } from 'redux';
import { App } from './App';
import './index.scss';

const defaultState: State = {
  countries: [],
  mode: '',
}

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return {...state, countries: [...action.payload]};

    case 'DARK':
      return {...state, mode: 'dark'}
    
    case 'LIGHT':
      return {...state, mode: 'light'}

    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
