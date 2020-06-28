import { IconButton } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (props: Readonly<{}>) => {
  const [openDelete, setOpenDelete] = useState(false)

  function showDeletes() {
    setOpenDelete(true)
  }

  function closeDelete() {
    setOpenDelete(false)
  }

  function deleteGroup() {
    setOpenDelete(false)
    props.onDelete(props.selected.id)
  }

  const { selected, onCreate } = props
  const groupName =
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
            onClick={showDeletes}
          >
            <Delete color="#fff" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={groupName}
            onCancel={closeDelete}
            onDelete={deleteGroup}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.customerGroups_titleAdd}
        onClick={onCreate}
      >
        <Add color="primary" className="material-icons" />
      </IconButton>
    </span>
  )
}

export default Buttons
