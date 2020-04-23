import api from "../../lib/api"
import messages from "../../lib/text"
import * as t from "./actionTypes"

function requestGroups() {
  return {
    type: t.GROUPS_REQUEST,
  }
}

function receiveGroups(items) {
  return {
    type: t.GROUPS_RECEIVE,
    items,
  }
}

function receiveErrorGroups(error) {
  return {
    type: t.GROUPS_FAILURE,
    error,
  }
}

export function selectGroup(id) {
  return {
    type: t.GROUPS_SELECT,
    selectedId: id,
  }
}

export function deselectGroup() {
  return {
    type: t.GROUPS_DESELECT,
  }
}

function requestUpdateGroup() {
  return {
    type: t.GROUP_UPDATE_REQUEST,
  }
}

function receiveUpdateGroup() {
  return {
    type: t.GROUP_UPDATE_SUCCESS,
  }
}

function errorUpdateGroup(error) {
  return {
    type: t.GROUP_UPDATE_FAILURE,
    error,
  }
}

function successCreateGroup() {
  return {
    type: t.GROUP_CREATE_SUCCESS,
  }
}

function successDeleteGroup() {
  return {
    type: t.GROUP_DELETE_SUCCESS,
  }
}

function fetchGroups() {
  return dispatch => {
    dispatch(requestGroups())
    return api.customerGroups
      .list()
      .then(({ json }) => {
        json = json.sort((a, b) => a.position - b.position)

        json.forEach((index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveGroups(json))
      })
      .catch(error => {
        dispatch(receiveErrorGroups(error))
      })
  }
}

function shouldFetchGroups(state) {
  const groups = state.customerGroups
  if (groups.isFetched || groups.isFetching) {
    return false
  }
  return true
}

export function fetchGroupsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    }
  }
}

export function updateGroup(data) {
  return dispatch => {
    dispatch(requestUpdateGroup(data.id))
    return api.customerGroups
      .update(data.id, data)
      .then(() => {
        dispatch(receiveUpdateGroup())
        dispatch(fetchGroups())
      })
      .catch(error => {
        dispatch(errorUpdateGroup(error))
      })
  }
}

export function createGroup(data) {
  return dispatch =>
    api.customerGroups
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateGroup(json.id))
        dispatch(fetchGroups())
        dispatch(selectGroup(json.id))
      })
      .catch(error => {
        // dispatch error
        console.log(error)
      })
}

export function deleteGroup(id) {
  return dispatch =>
    api.customerGroups
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteGroup(id))
          dispatch(deselectGroup())
          dispatch(fetchGroups())
        } else {
          throw status
        }
      })
      .catch(error => {
        // dispatch error
        console.log(error)
      })
}
