import { Dialog, DialogActions } from "@material-ui/core"
import React, { useEffect, useState } from "react"

const ConfirmationDialog = (
  props: Readonly<{
    open: boolean
    title: string
    description: string
    submitLabel: string
    cancelLabel: string
    modal: boolean
    onSubmit: Function
    onCancel: Function
  }>
) => {
  const [open, setOpen] = useState(props.open)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  const handleCancel = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  const handleSubmit = () => {
    setOpen(false)
    if (onSubmit) {
      onSubmit()
    }
  }

  const {
    title,
    description,
    submitLabel,
    cancelLabel,
    modal = false,
    onSubmit,
    onCancel,
  } = props

  return (
    <Dialog
      title={title}
      modal={modal}
      open={open}
      onRequestClose={handleCancel}
    >
      <div style={{ wordWrap: "break-word" }}>{description}</div>
      <DialogActions>
        <Button onClick={handleCancel} style={{ marginRight: 10 }}>
          {cancelLabel}
        </Button>
        <Button color="primary" keyboardFocused onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
