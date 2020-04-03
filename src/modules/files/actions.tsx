import api from "../../lib/api";
import * as t from "./actionTypes";

function receiveFiles(files) {
  return {
    type: t.FILES_RECEIVE,
    files
  };
}

function filesUploadStart() {
  return {
    type: t.FILES_UPLOAD_START
  };
}

function filesUploadEnd() {
  return {
    type: t.FILES_UPLOAD_END
  };
}

export function fetchFiles() {
  return dispatch =>
    api.files.list().then(({ json }) => {
      dispatch(receiveFiles(json));
    });
}

export function uploadFiles(form) {
  return dispatch => {
    dispatch(filesUploadStart());
    return api.files
      .upload(form)
      .then(() => {
        dispatch(filesUploadEnd());
        dispatch(fetchFiles());
      })
      .catch(error => {
        dispatch(filesUploadEnd());
      });
  };
}

export function deleteFile(fileName) {
  return dispatch =>
    api.files.delete(fileName).then(() => {
      dispatch(fetchFiles());
    });
}
