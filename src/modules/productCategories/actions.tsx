import { Dispatch } from "redux"
import api from "../../lib/api"
import messages from "../../lib/text"
import * as t from "./actionTypes"

function requestCategories() {
  return {
    type: t.CATEGORIES_REQUEST,
  }
}

function receiveCategories(items: string) {
  return {
    type: t.CATEGORIES_RECEIVE,
    items,
  }
}

function receiveErrorCategories(error: string) {
  return {
    type: t.CATEGORIES_FAILURE,
    error,
  }
}

export function selectCategory(id: string) {
  return {
    type: t.CATEGORIES_SELECT,
    selectedId: id,
  }
}

export function deselectCategory() {
  return {
    type: t.CATEGORIES_DESELECT,
  }
}

function requestUpdateCategory() {
  return {
    type: t.CATEGORY_UPDATE_REQUEST,
  }
}

function receiveUpdateCategory() {
  return {
    type: t.CATEGORY_UPDATE_SUCCESS,
  }
}

function errorUpdateCategory(error: string) {
  return {
    type: t.CATEGORY_UPDATE_FAILURE,
    error,
  }
}

function successCreateCategory() {
  return {
    type: t.CATEGORY_CREATE_SUCCESS,
  }
}

function successDeleteCategory() {
  return {
    type: t.CATEGORY_DELETE_SUCCESS,
  }
}

function successMoveUpDownCategory(newPosition: string) {
  return {
    type: t.CATEGORY_MOVE_UPDOWN_SUCCESS,
    position: newPosition,
  }
}

function successReplaceCategory() {
  return {
    type: t.CATEGORY_REPLACE_SUCCESS,
  }
}

function imageUploadStart() {
  return {
    type: t.CATEGORY_IMAGE_UPLOAD_START,
  }
}

function imageUploadEnd() {
  return {
    type: t.CATEGORY_IMAGE_UPLOAD_END,
  }
}

export function fetchCategories() {
  return (dispatch: Dispatch) => {
    dispatch(requestCategories())
    const { json } = api.productCategories.list()
    try {
      json.forEach((element, index, theArray) => {
        if (theArray[index].name === "") {
          theArray[index].name = `<${messages.draft}>`
        }
      })

      dispatch(receiveCategories(json))
    } catch (error) {
      console.error(error)
      dispatch(receiveErrorCategories(error))
    }
  }
}

function shouldFetchCategories(state: {}) {
  const categories = state.productCategories
  if (categories.isFetched || categories.isFetching) {
    return false
  }
  return true
}

export function fetchCategoriesIfNeeded() {
  return (dispatch: Dispatch, getState: Function) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories())
    }
  }
}

function sendUpdateCategory(id: string, data: string) {
  return (dispatch: Dispatch) => {
    dispatch(requestUpdateCategory())
    try {
      api.productCategories.update(id, data)
      dispatch(receiveUpdateCategory())
      dispatch(fetchCategories())
    } catch (error) {
      console.error(error)
      dispatch(errorUpdateCategory(error))
    }
  }
}

export function updateCategory(data: { id: string }) {
  return (dispatch: Dispatch) => dispatch(sendUpdateCategory(data.id, data))
}

export function createCategory() {
  return (dispatch: Dispatch) => {
    const { json } = api.productCategories.create({ enabled: false })
    try {
      dispatch(successCreateCategory(json.id))
      dispatch(fetchCategories())
      dispatch(selectCategory(json.id))
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteImage() {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    const { status } = api.productCategories.deleteImage(categoryId)
    try {
      if (status === 200) {
        dispatch(fetchCategories())
      } else {
        throw status
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteCategory(id: string) {
  return (dispatch: Dispatch) => {
    const { status } = api.productCategories.delete(id)
    try {
      if (status === 200) {
        dispatch(successDeleteCategory())
        dispatch(deselectCategory())
        dispatch(fetchCategories())
      } else {
        throw status
      }
    } catch (error) {
      console.error(error)
    }
  }
}

function moveCategory(allCategories = [], selectedCategory, isUp = true) {
  return new Promise((resolve, reject) => {
    if (isUp) {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position < selectedCategory.position
        )
        .sort((a, b) => b.position - a.position)
    } else {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position > selectedCategory.position
        )
        .sort((a, b) => a.position - b.position)
    }

    if (allCategories.length > 0) {
      const targetCategory = allCategories[0]
      const newPosition = targetCategory.position
      try {
        api.productCategories.update(selectedCategory.id, {
          position: targetCategory.position,
        })
        api.productCategories.update(targetCategory.id, {
          position: selectedCategory.position,
        })
        resolve(newPosition)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    }
  })
}

export function moveUpCategory() {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState()
    const allCategories = state.productCategories.items
    const selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )

    const isUp = true

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function moveDownCategory() {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState()
    const allCategories = state.productCategories.items
    const selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )
    const isUp = false

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function replaceCategory(parentId) {
  return (dispatch, getState) => {
    const state = getState()
    const selectedCategory = state.productCategories.items.find(
      item => item.id === state.productCategories.selectedId
    )
    try {
      api.productCategories.update(selectedCategory.id, { parent_id: parentId })
      dispatch(successReplaceCategory())
      dispatch(fetchCategories())
    } catch (error) {
      console.error(error)
    }
  }
}

export function uploadImage(form: string) {
  return (dispatch: Dispatch, getState: Function) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    dispatch(imageUploadStart())
    try {
      api.productCategories.uploadImage(categoryId, form)
      dispatch(imageUploadEnd())
      dispatch(fetchCategories())
    } catch (error) {
      console.error(error)
      dispatch(imageUploadEnd())
    }
  }
}
