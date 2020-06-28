import { Button, Dialog, DialogActions, IconButton } from "@material-ui/core"
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Delete,
  Folder,
} from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import CategorySelect from "../../../../modules/productCategories/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (
  props: Readonly<{
    selected
    onMoveUp
    onMoveDown
    onDelete
    onCreate
    onMoveTo
  }>
) => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState("root")
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { selected, onMoveUp, onMoveDown, onDelete, onCreate, onMoveTo } = props

  const showMoveTo = () => {
    setOpenMoveTo(true)
  }

  const showDelete = () => {
    setOpenDelete(true)
  }

  const closeMoveTo = () => {
    setOpenMoveTo(false)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteCategory = () => {
    setOpenDelete(false)
    onDelete(selected.id)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const selectMoveTo = categoryId => {
    setCategoryIdMoveTo(categoryId)
  }

  const categoryName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft"

  return (
    <span>
      {selected && (
        <>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveUp}
            onClick={onMoveUp}
          >
            <ArrowUpward color="secondary" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <ArrowDownward color="secondary" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={showDelete}
          >
            <Delete color="secondary" className="material-icons" />
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={showMoveTo}
          >
            <Folder color="secondary" className="material-icons" />
          </IconButton>
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
              showRoot
              showAll={false}
            />
            <DialogActions>
              <Button onClick={closeMoveTo} style={{ marginRight: 10 }}>
                {messages.cancel}
              </Button>
              <Button color="primary" keyboardFocused onClick={saveMoveTo}>
                {messages.actions_moveHere}
              </Button>
            </DialogActions>
          </Dialog>
          <DeleteConfirmation
            open={openDelete}
            isSingle
            itemsCount={1}
            itemName={categoryName}
            onCancel={closeDelete}
            onDelete={deleteCategory}
          />
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.productCategories_titleAdd}
        onClick={onCreate}
      >
        <Add color="secondary" className="material-icons" />
      </IconButton>
    </span>
  )
}

export default Buttons
