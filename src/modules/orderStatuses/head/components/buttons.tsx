import { IconButton } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (props: { onDelete?: any; selected: any; onCreate?: any }) => {
  const [openDelete, setOpenDelete] = useState(false)

  const showDelete = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteStatus = () => {
    setOpenDelete(false)
    props.onDelete(props.selected.id)
  }

  const { selected, onCreate } = props
  const statusName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltip={messages.actions_delete}
            tooltipPosition="bottom-left"
            onClick={showDelete}
          >
            <Delete color="primary" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={statusName}
            onCancel={closeDelete}
            onDelete={deleteStatus}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addOrderStatus}
        onClick={onCreate}
      >
        <Add color="primary" className="material-icons" />
      </IconButton>
    </span>
  )
}

export default Buttons
