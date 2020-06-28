import { Dialog, DialogActions } from "@material-ui/core"
import React, { useState } from "react"
import messages from "../../../lib/text"

const ConfirmationDialog = (props: Readonly<{}>) => {
  const [open, setOpen] = useState(open)

  const {
    isSingle = true,
    itemsCount = 0,
    itemName = "",
    open,
    onCancel,
    onDelete,
  } = props

  useEffect(() => {
    setOpen(open)
  }, [open])

  const close = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    close()
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
