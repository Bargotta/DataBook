import allReducers from './reducers'
import App from './components/App';
import {createStore} from 'redux';
import './components/index.css';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const store = createStore(allReducers);

ReactDOM.render(
	<Provider store={store}>
  		<App />
	</Provider>,
  document.getElementById('root')
);
