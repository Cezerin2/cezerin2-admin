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
  return (
    dispatch: (arg0: { type: string; items?: any; error?: any }) => void
  ) => {
    dispatch(requestGroups())
    return api.customerGroups
      .list()
      .then(({ status, json }) => {
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
      })
      .catch((error: any) => {
        dispatch(receiveErrorGroups(error))
      })
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
  return (
    dispatch: (arg0: (dispatch: any) => any) => any,
    getState: () => any
  ) => {
    if (shouldFetchGroups(getState())) {
      return dispatch(fetchGroups())
    }
  }
}

export function updateGroup(data: { id: any }) {
  return (
    dispatch: (arg0: {
      (dispatch: any): any
      type?: string
      error?: any
    }) => void,
    getState: any
  ) => {
    dispatch(requestUpdateGroup(data.id))
    return api.customerGroups
      .update(data.id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateGroup())
        dispatch(fetchGroups())
      })
      .catch((error: any) => {
        dispatch(errorUpdateGroup(error))
      })
  }
}

export function createGroup(data: { id: any }) {
  return (
    dispatch: (arg0: {
      (dispatch: any): any
      type?: string
      selectedId?: any
    }) => void,
    getState: any
  ) =>
    api.customerGroups
      .create(data)
      .then(({ status, json }) => {
        dispatch(successCreateGroup(json.id))
        dispatch(fetchGroups())
        dispatch(selectGroup(json.id))
      })
      .catch((error: any) => {
        // dispatch error
        console.log(error)
      })
}

export function deleteGroup(id: any) {
  return (
    dispatch: (arg0: { (dispatch: any): any; type?: string }) => void,
    getState: any
  ) =>
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
      .catch((error: any) => {
        // dispatch error
        console.log(error)
      })
}
