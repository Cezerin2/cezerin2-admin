import { IconButton, MenuItem, Paper } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import IconMenu from "material-ui/IconMenu"
import moment from "moment"
import React, { useEffect, useState } from "react"
import * as helper from "../../../../lib/helper"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import FileUploader from "./fileUploader"
import style from "./style.module.sass"

const iconButtonElement = (
  <IconButton touch>
    <MoreVert color="secondary" className="material-icons" />
  </IconButton>
)

const FileItem = (props: Readonly<{}>) => {
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
  const fileUrl = `${settings.assetServerDomain}/${file.file}`
  const modifiedDate = moment(file.modified)
  const modifiedDateFormated = modifiedDate.format(`${settings.date_format}`)
  const fileSizeFormated = helper.formatFileSize(file.size)

  return (
    <div className={`${style.item} row row--no-gutter middle-xs`}>
      <div className={`${style.name} col-xs-5`}>
        <a href={fileUrl} target="_blank" rel="noopener">
          {file.file}
        </a>
      </div>
      <div className={`${style.date} col-xs-3`}>{modifiedDateFormated}</div>
      <div className={`${style.size} col-xs-2`}>{fileSizeFormated}</div>
      <div className={`${style.more} col-xs-2`}>
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

const FileList = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { files, settings, onDelete, onUpload, uploading } = props
  const listItems = files.map((file, index) => (
    <FileItem key={index} file={file} settings={settings} onDelete={onDelete} />
  ))

  return (
    <>
      <div className={`${style.head} row row--no-gutter`}>
        <div className="col-xs-5">{messages.fileName}</div>
        <div className="col-xs-3">{messages.fileModified}</div>
        <div className="col-xs-2">{messages.fileSize}</div>
        <div className="col-xs-2" />
      </div>
      <Paper className="paper-box" elevation={1}>
        {listItems}
      </Paper>
      <FileUploader onUpload={onUpload} uploading={uploading} />
    </>
  )
}

export default FileList
