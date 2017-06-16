import {combineReducers} from 'redux';
import UserReducer from './reducer_user';

const allReducers = combineReducers({
	users: UserReducer
});

export default allReducers;