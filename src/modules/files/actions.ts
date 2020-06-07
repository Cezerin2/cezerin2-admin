import api from "../../lib/api"
import * as t from "./actionTypes"

function receiveFiles(files: any) {
  return {
    type: t.FILES_RECEIVE,
    files,
  }
}

function filesUploadStart() {
  return {
    type: t.FILES_UPLOAD_START,
  }
}

function filesUploadEnd() {
  return {
    type: t.FILES_UPLOAD_END,
  }
}

export function fetchFiles() {
  return (
    dispatch: (arg0: { type: string; files: any }) => void,
    getState: any
  ) =>
    api.files
      .list()
      .then(({ status, json }) => {
        dispatch(receiveFiles(json))
      })
      .catch((error: any) => {})
}

export function uploadFiles(form: any) {
  return (
    dispatch: (arg0: {
      (dispatch: any, getState: any): any
      type?: string
    }) => void,
    getState: any
  ) => {
    dispatch(filesUploadStart())
    return api.files
      .upload(form)
      .then(() => {
        dispatch(filesUploadEnd())
        dispatch(fetchFiles())
      })
      .catch((error: any) => {
        dispatch(filesUploadEnd())
      })
  }
}

export function deleteFile(fileName: any) {
  return (
    dispatch: (arg0: (dispatch: any, getState: any) => any) => void,
    getState: any
  ) =>
    api.files
      .delete(fileName)
      .then(() => {
        dispatch(fetchFiles())
      })
      .catch((error: any) => {})
}
