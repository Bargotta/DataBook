import { combineReducers } from 'redux';

import ActiveUserReducer from './reducer_active_user';
import UsersReducer from './reducer_users';

const allReducers = combineReducers({
	users: UsersReducer,
	activeUser: ActiveUserReducer
});

export default allReducers;