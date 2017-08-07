import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(`api/users`)
    .then(response => response.json())
    .then(json => dispatch(receiveUsers(json)))
  }
}

function requestUsers() {
  return {
    type: REQUEST_USERS
  }
}

function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    users: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
