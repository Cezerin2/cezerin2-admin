import React, { useState, useEffect } from "react"

import moment from "moment"
import messages from "lib/text"
import * as helper from "lib/helper"
import DeleteConfirmation from "modules/shared/deleteConfirmation"

import Paper from "material-ui/Paper"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import FileUploader from "./fileUploader"
import "./style.sass"

const iconButtonElement = (
  <IconButton touch>
    <FontIcon color="rgb(189, 189, 189)" className="material-icons">
      more_vert
    </FontIcon>
  </IconButton>
)

const FileItem = props => {
  const [openDelete, setOpenDelete] = useState(false)

  const showDelete = () => {
    setOpenDelete(true)
  }

  const hideDelete = () => {
    setOpenDelete(false)
  }

  const handleDelete = () => {
    const fileName = props.file.file
    props.onDelete(fileName)
    hideDelete()
  }

  const { file, settings } = props
  const fileName = file.file
  const fileUrl = `${settings.domain}/${file.file}`
  const modifiedDate = moment(file.modified)
  const modifiedDateFormated = modifiedDate.format(`${settings.date_format}`)
  const fileSizeFormated = helper.formatFileSize(file.size)

  return (
    <div className={`$"item} row row--no-gutter middle-xs`}>
      <div className={`$"name} col-xs-5`}>
        <a href={fileUrl} target="_blank" rel="noopener">
          {file.file}
        </a>
      </div>
      <div className={`$"date} col-xs-3`}>{modifiedDateFormated}</div>
      <div className={`$"size} col-xs-2`}>{fileSizeFormated}</div>
      <div className={`$"more} col-xs-2`}>
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={showDelete}>{messages.actions_delete}</MenuItem>
        </IconMenu>
        <DeleteConfirmation
          open={state.openDelete}
          isSingle
          itemsCount={1}
          itemName={fileName}
          onCancel={hideDelete}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

const FileList = props => {
  useEffect(() => props.onLoad(), [])

  const { files, settings, onDelete, onUpload, uploading } = props
  const listItems = files.map((file, index) => (
    <FileItem key={index} file={file} settings={settings} onDelete={onDelete} />
  ))

  return (
    <>
      <div className={`$"head} row row--no-gutter`}>
        <div className="col-xs-5">{messages.fileName}</div>
        <div className="col-xs-3">{messages.fileModified}</div>
        <div className="col-xs-2">{messages.fileSize}</div>
        <div className="col-xs-2" />
      </div>
      <Paper className="paper-box" zDepth={1}>
        {listItems}
      </Paper>
      <FileUploader onUpload={onUpload} uploading={uploading} />
    </>
  )
}

export default FileList
