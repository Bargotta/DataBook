import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import allReducers from './reducers'

import './components/index.css';

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}>
  		<App />
	</Provider>,
  document.getElementById('root')
);
