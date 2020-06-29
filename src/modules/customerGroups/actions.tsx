import { Dispatch } from "redux"
import api from "../../lib/api"
import messages from "../../lib/text"
import * as t from "./actionTypes"

function requestGroups() {
  return {
    type: t.GROUPS_REQUEST,
  }
}

function receiveGroups(items: any) {
  return {
    type: t.GROUPS_RECEIVE,
    items,
  }
}

function receiveErrorGroups(error: any) {
  return {
    type: t.GROUPS_FAILURE,
    error,
  }
}

export function selectGroup(id: any) {
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

function requestUpdateGroup(id: any) {
  return {
    type: t.GROUP_UPDATE_REQUEST,
  }
}

function receiveUpdateGroup() {
  return {
    type: t.GROUP_UPDATE_SUCCESS,
  }
}

function errorUpdateGroup(error: any) {
  return {
    type: t.GROUP_UPDATE_FAILURE,
    error,
  }
}

function successCreateGroup(id: any) {
  return {
    type: t.GROUP_CREATE_SUCCESS,
  }
}

function successDeleteGroup(id: any) {
  return {
    type: t.GROUP_DELETE_SUCCESS,
  }
}

function fetchGroups() {
  return (dispatch: Dispatch) => {
    dispatch(requestGroups())
    const { status, json } = api.customerGroups.list()
    try {
      json = json.sort(
        (a: { position: number }, b: { position: number }) =>
          a.position - b.position
      )

      json.forEach(
        (
          element: any,
          index: string | number,
          theArray: { [x: string]: { name: string } }
        ) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        }
      )

      dispatch(receiveGroups(json))
    } catch (error) {
      console.error(error)
      dispatch(receiveErrorGroups(error))
    }
  }
}

function shouldFetchGroups(state: { customerGroups: any }) {
  const groups = state.customerGroups
  if (groups.isFetched || groups.isFetching) {
    return false
  }
  return true
}

export function fetchGroupsIfNeeded() {
  return (dispatch: Dispatch, getState: () => any) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    }
  }
}

export function updateGroup(data: { id: any }) {
  return (dispatch: Dispatch) => {
    dispatch(requestUpdateGroup(data.id))
    try {
      dispatch(receiveUpdateGroup())
      dispatch(fetchGroups())
    } catch (error) {
      console.error(error)
      dispatch(errorUpdateGroup(error))
    }
    return api.customerGroups.update(data.id, data)
  }
}

export function createGroup(data: { id: any }) {
  return (dispatch: Dispatch) => {
    const { json } = api.customerGroups.create(data)
    try {
      dispatch(successCreateGroup(json.id))
      dispatch(fetchGroups())
      dispatch(selectGroup(json.id))
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteGroup(id: any) {
  return (dispatch: Dispatch) => {
    const { status } = api.customerGroups.delete(id)
    try {
      if (status === 200) {
        dispatch(successDeleteGroup(id))
        dispatch(deselectGroup())
        dispatch(fetchGroups())
      } else {
        console.warn(status)
        throw status
      }
    } catch (error) {
      console.error(error)
      console.warn(status)
    }
  }
}
