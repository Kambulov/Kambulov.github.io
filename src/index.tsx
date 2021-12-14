import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'storeon/react';
import './styles/index.scss';
import App from './components/App';
import store from "./store";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
