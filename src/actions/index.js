import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'

// fetch all users
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

// fetch userId
export function fetchUser(userId) {
  return dispatch => {
    dispatch(requestUser(userId))
    return fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)))
  }
}

function requestUser(userId) {
  return {
    type: REQUEST_USER,
    userId
  }
}

function receiveUser(json) {
  return {
    type: RECEIVE_USER,
    user: json,
    receivedAt: Date.now()
  }
}

// fetch all projects
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
