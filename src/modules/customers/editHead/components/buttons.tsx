import { Delete } from "@material-ui/icons"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (props: { onDelete?: any; customer?: any }) => {
  const [openDelete, setOpenDelete] = useState(false)

  const { customer, onDelete } = props

  const openDeletes = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteOrder = () => {
    closeDelete()
    onDelete()
  }

  const customerName =
    customer && customer.full_name && customer.full_name.length > 0
      ? customer.full_name
      : "Draft"

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={openDeletes}
      >
        <Delete color="primary" className="material-icons" />
      </IconButton>
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={customerName}
        onCancel={closeDelete}
        onDelete={props.onDelete}
      />
    </>
  )
}

export default Buttons
