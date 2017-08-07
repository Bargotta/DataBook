import { combineReducers } from 'redux'
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS
} from '../actions'

function users(
  state = {
    isFetching: false,
    users: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function projects(
  state = {
    isFetching: false,
    projects: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, {
        isFetching: false,
        projects: action.projects,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users,
  projects
})

export default rootReducer
