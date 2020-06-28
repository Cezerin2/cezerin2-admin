import { Button, Dialog, DialogActions, IconButton } from "@material-ui/core"
import { Add, Delete, Folder } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import CategorySelect from "../../../../modules/productCategories/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import Search from "./search"

const Buttons = (props: Readonly<{}>) => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState(null)
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const showMoveTo = () => {
    setOpenMoveTo(true)
  }

  const openDeletes = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteProduct = () => {
    setOpenDelete(false)
    onDelete()
  }

  const closeMoveTo = () => {
    setOpenMoveTo(false)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const selectMoveTo = (categoryId: string) => {
    setCategoryIdMoveTo(categoryId)
  }

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onMoveTo,
  } = props

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={openDeletes}
          >
            <Delete color="#fff" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={showMoveTo}
          >
            <Folder color="primary" className="material-icons" />
          </IconButton>
          <DeleteConfirmation
            open={openDelete}
            isSingle={false}
            itemsCount={selectedCount}
            onCancel={closeDelete}
            onDelete={deleteProduct}
          />
          <Dialog
            title={messages.actions_moveTo}
            modal={false}
            open={openMoveTo}
            onRequestClose={closeMoveTo}
            autoScrollBodyContent
          >
            <CategorySelect
              onSelect={selectMoveTo}
              selectedId={categoryIdMoveTo}
              opened
            />
            <DialogActions>
              <Button onClick={closeMoveTo} style={{ marginRight: 10 }}>
                {messages.cancel}
              </Button>
              <Button coor="primary" keyboardFocused onClick={saveMoveTo}>
                {messages.actions_moveHere}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addProduct}
        onClick={onCreate}
      >
        <Add color="primary" className="material-icons" />
      </IconButton>
    </>
  )
}

export default Buttons
