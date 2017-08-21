import { combineReducers } from 'redux'

import users from './users'
import activeUser from './activeUser'
import projects from './projects'

const rootReducer = combineReducers({
  users,
  activeUser,
  projects
})

export default rootReducer
