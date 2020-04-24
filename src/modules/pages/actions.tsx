import api from "../../lib/api"
import * as t from "./actionTypes"

function receivePages(pages) {
  return {
    type: t.PAGES_RECEIVE,
    pages,
  }
}

export function receivePage(pageEdit) {
  return {
    type: t.PAGE_RECEIVE,
    pageEdit,
  }
}

export function fetchPages() {
  return dispatch =>
    api.pages
      .list()
      .then(({ json }) => {
        dispatch(receivePages(json))
      })
      .catch(error => console.error(error))
}

export function fetchPage(id) {
  return dispatch =>
    api.pages
      .retrieve(id)
      .then(({ json }) => {
        dispatch(receivePage(json))
      })
      .catch(error => console.error(error))
}

export function createPage(page) {
  return dispatch =>
    api.pages
      .create(page)
      .then(() => {
        dispatch(fetchPages())
      })
      .catch(error => console.error(error))
}

export function updatePage(page) {
  return dispatch =>
    api.pages
      .update(page.id, page)
      .then(({ json }) => {
        dispatch(receivePage(json))
      })
      .catch(error => console.error(error))
}

export function deletePage(pageId) {
  return dispatch =>
    api.pages
      .delete(pageId)
      .then(() => {
        dispatch(fetchPages())
      })
      .catch(error => console.error(error))
}
