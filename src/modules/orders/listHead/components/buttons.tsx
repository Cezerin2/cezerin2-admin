import { IconButton } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import Search from "./search"
const Buttons = (
  props: Readonly<{
    search: string
    setSearch: string
    selectedCount: number
    onDelete: Function
    onCreate: string
  }>
) => {
  const [openDelete, setOpenDelete] = useState(false)

  const openDeletes = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteOrders = () => {
    setOpenDelete(false)
    onDelete()
  }

  const { search, setSearch, selectedCount, onDelete, onCreate } = props

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={openDelete}
          >
            <Delete color="primary" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={closeDelete}
            onDelete={deleteOrders}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.orders_titleAdd}
        onClick={onCreate}
      >
        <Add color="primary" className="material-icons" />
      </IconButton>
    </>
  )
}

export default Buttons
