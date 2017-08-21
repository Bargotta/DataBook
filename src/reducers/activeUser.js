import {
  REQUEST_USER,
  RECEIVE_USER
} from '../actions'

export default function activeUser(
  state = {
    isFetching: false,
    user: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
