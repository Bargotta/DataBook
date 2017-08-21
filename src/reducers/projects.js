import {
  REQUEST_PROJECTS,
  RECEIVE_PROJECTS
} from '../actions'

export default function projects(
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
