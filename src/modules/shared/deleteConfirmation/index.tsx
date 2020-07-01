import { Button, Dialog, DialogActions } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import messages from "../../../lib/text"

const ConfirmationDialog = (
  props: Readonly<{
    isSingle
    itemsCount
    itemName
    onDelete
    onCancel
  }>
) => {
  const [open, setOpen] = useState(props.open)

  const {
    isSingle = true,
    itemsCount = 0,
    itemName = "",
    onDelete,
    onCancel,
  } = props

  useEffect(() => {
    setOpen(props.open)
  }, [])

  const handleCancel = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleDelete = () => {
    close()
    if (onDelete) {
      onDelete()
    }
  }

  const title = isSingle
    ? messages.singleDeleteTitle.replace("{name}", itemName)
    : messages.multipleDeleteTitle.replace("{count}", itemsCount)

  const description = isSingle
    ? messages.singleDeleteDescription
    : messages.multipleDeleteDescription.replace("{count}", itemsCount)

  return (
    <Dialog
      title={title}
      modal={false}
      open={open}
      onRequestClose={handleCancel}
      contentStyle={{ maxWidth: 540 }}
      titleStyle={{ fontSize: "18px", lineHeight: "28px" }}
    >
      <div style={{ wordWrap: "break-word", width: "500px", margin: "25px" }}>
        {description}
      </div>
      <DialogActions>
        <Button onClick={handleCancel} style={{ marginRight: 10 }}>
          {messages.cancel}
        </Button>
        <Button color="primary" keyboardFocused onClick={handleDelete}>
          {messages.actions_delete}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
