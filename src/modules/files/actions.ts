import { Dispatch } from "redux"
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
  return (dispatch: Dispatch) => {
    const { json } = api.files.list()
    try {
      dispatch(receiveFiles(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function uploadFiles(form: any) {
  return (dispatch: Dispatch, getState: any) => {
    dispatch(filesUploadStart())
    try {
      api.files.upload(form)
      dispatch(filesUploadEnd())
      dispatch(fetchFiles())
    } catch (error) {
      console.error(error)
      dispatch(filesUploadEnd())
    }
  }
}

export function deleteFile(fileName: any) {
  return (dispatch: Dispatch) => {
    try {
      api.files.delete(fileName)
      dispatch(fetchFiles())
    } catch (error) {
      console.error(error)
    }
  }
}
