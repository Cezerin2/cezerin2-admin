import React, { useState, useEffect } from "react"
import messages from "lib/text"
import Dropzone from "react-dropzone"

import Paper from "material-ui/Paper"
import Snackbar from "material-ui/Snackbar"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"

import "./style.sass"

const ImageUpload = props => {
  const [imagePreview, setImagePreview] = useState(props.imageUrl)
  const onDelete = () => {
    setImagePreview(null)
    props.onDelete()
  }

  useEffect(nextProps => setImagePreview(nextProps.imageUrl), [props.nextProps])

  const onDrop = files => {
    const form = new FormData()
    form.append("file", files[0])
    props.onUpload(form)
  }
  const { uploading } = props

  const hasPreview = imagePreview !== null && imagePreview !== ""
  const previewIsFileUrl = hasPreview ? imagePreview.startsWith("http") : null

  let htmlPreview = (
    <div className="noImage">
      <FontIcon
        style={{ fontSize: 90, color: "#cccccc" }}
        className="material-icons"
      >
        photo_camera
      </FontIcon>
      <div className="dropText">{messages.help_dropHere}</div>
    </div>
  )

  if (hasPreview && previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  } else if (hasPreview && !previewIsFileUrl) {
    htmlPreview = <img src={imagePreview} />
  }

  return (
    <Paper zDepth={1} rounded={false} style={{ width: 200 }}>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        disableClick={hasPreview}
        accept="image/*"
        ref={node => {
          dropzone = node
        }}
        style={{}}
        className="dropzone"
        activeClassName="dropzoneActive"
        rejectClassName="dropzoneReject"
      >
        {({ getRootProps, getInputProps }) =>
          props.children != null ? (
            props.children
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="preview">{htmlPreview}</div>
            </div>
          )
        }
      </Dropzone>

      <div className="footer">
        <IconButton
          touch
          tooltip={messages.actions_upload}
          onClick={() => {
            dropzone.open()
          }}
          tooltipPosition="top-right"
        >
          <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
            file_upload
          </FontIcon>
        </IconButton>
        {hasPreview && (
          <IconButton
            touch
            tooltip={messages.actions_delete}
            onClick={onDelete}
            tooltipPosition="top-right"
          >
            <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
        )}
      </div>
      <Snackbar open={uploading} message={messages.messages_uploading} />
    </Paper>
  )
}

export default ImageUpload
