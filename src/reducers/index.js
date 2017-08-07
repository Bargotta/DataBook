import { combineReducers } from 'redux'
import {
  SELECT_USERS,
  REQUEST_USERS,
  RECEIVE_USERS
} from '../actions'

function selectedUser(state = [], action) {
  switch (action.type) {
    case SELECT_USERS:
      return action.userId
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
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
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedUser
})

export default rootReducer
