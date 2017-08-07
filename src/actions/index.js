import fetch from 'isomorphic-fetch'

export const SELECT_USERS = 'SELECT_USERS'
export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

function fetchPosts(userId) {
  return dispatch => {
    dispatch(requestPosts(userId))
    return fetch(`api/users/${userId}`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(userId, json)))
  }
}

export function selectuser(userId) {
  return {
    type: SELECT_USERS,
    userId
  }
}

function requestPosts(userId) {
  return {
    type: REQUEST_USERS,
    userId
  }
}

function receivePosts(userId, json) {
  return {
    type: RECEIVE_USERS,
    userId,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}
