import React from "react"
import Dropzone from "react-dropzone"
import messages from "../../../../../lib/text"

import Snackbar from "material-ui/Snackbar"
import FlatButton from "material-ui/FlatButton"
import "./style.sass"

const MultiUploader = props => {
  const onDrop = files => {
    const form = new FormData()
    files.map(file => {
      form.append("file", file)
    })
    props.onUpload(form)
  }

  const { uploading } = props
  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple
        disableClick
        ref={node => {
          dropzone = node
        }}
        style={{}}
        className={dropzone + (uploading ? ` ${uploading}` : "")}
        activeClassName="dropzoneActive"
        rejectClassName="dropzoneReject"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="dropzoneEmpty">
              {messages.help_dropHere}
              <FlatButton
                label={messages.chooseImage}
                className="button"
                onClick={() => {
                  dropzone.open()
                }}
              />
            </div>
          </div>
        )}
      </Dropzone>
      <Snackbar open={uploading} message={messages.messages_uploading} />
    </>
  )
}

export default MultiUploader
