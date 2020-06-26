import { Dialog, DialogActions } from "@material-ui/core"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import CategorySelect from "../../../../modules/productCategories/select"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (props: Readonly<{}>) => {
  const [categoryIdMoveTo, setCategoryIdMoveTo] = useState("root")
  const [openMoveTo, setOpenMoveTo] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
    onDelete(props.selected.id)
  }

  const saveMoveTo = () => {
    setOpenMoveTo(false)
    onMoveTo(categoryIdMoveTo)
  }

  const selectMoveTo = categoryId => {
    setCategoryIdMoveTo(categoryId)
  }

  const { selected, onMoveUp, onMoveDown, onDelete, onCreate, onMoveTo } = props
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
            <FontIcon color="#fff" className="material-icons">
              arrow_upward
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <FontIcon color="#fff" className="material-icons">
              arrow_downward
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={showDelete}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={showMoveTo}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
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
              <FlatButton
                label={messages.cancel}
                onClick={closeMoveTo}
                style={{ marginRight: 10 }}
              />
              <FlatButton
                label={messages.actions_moveHere}
                primary
                keyboardFocused
                onClick={saveMoveTo}
              />
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
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </span>
  )
}

export default Buttons
