import { Paper } from "@material-ui/core"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import messages from "../../../lib/text"
import style from "./style.css"

const GalleryItem = ({ url, alt, id, onDelete, onImageEdit }) => (
  <Paper elevation={1} rounded={false}>
    <div className={style.preview}>
      <img src={url} title={alt} />
    </div>
    <div className={style.footer}>
      <IconButton
        touch
        tooltip={messages.edit}
        tooltipPosition="top-right"
        onClick={onImageEdit}
      >
        <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
          create
        </FontIcon>
      </IconButton>
      <IconButton
        touch
        tooltip={messages.actions_delete}
        tooltipPosition="top-right"
        onClick={() => {
          onDelete(id)
        }}
      >
        <FontIcon color="rgba(0,0,0,0.5)" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
    </div>
  </Paper>
)

export default GalleryItem
