import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'

export function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(`/api/users`)
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
    users: json,
    receivedAt: Date.now()
  }
}

export function fetchProjects() {
  return dispatch => {
    dispatch(requestProjects())
    return fetch(`/api/projects`)
    .then(response => response.json())
    .then(json => dispatch(receiveProjects(json)))
  }
}

function requestProjects() {
  return {
    type: REQUEST_PROJECTS
  }
}

function receiveProjects(json) {
  return {
    type: RECEIVE_PROJECTS,
    projects: json,
    receivedAt: Date.now()
  }
}
