import {combineReducers} from 'redux';
import UserReducer from './reducer_user';
import ActiveUserReducer from './reducer_active_user';

const allReducers = combineReducers({
	users: UserReducer,
	activeUser: ActiveUserReducer
});

export default allReducers;