import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import CategorySelect from "../../../../../modules/productCategories/select"

const ProductCategorySelect = (props: Readonly<{}>) => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  const constopen = () => {
    setOpen(true)
  }

  const handleSelect = categoryId => {
    props.input.onChange(categoryId)
  }

  const {
    categories,
    input,
    meta: { touched, error },
  } = props

  const selectedCategoryId = input.value
  const category = categories.find(item => item.id === selectedCategoryId)
  const categoryName = category ? category.name : ""

  return (
    <>
      <Dialog
        title={messages.category}
        modal={false}
        open={open}
        onRequestClose={close}
        autoScrollBodyContent
      >
        <CategorySelect
          onSelect={handleSelect}
          selectedId={selectedCategoryId}
          opened={false}
        />
        <DialogActions>
          <FlatButton
            label={messages.cancel}
            onClick={close}
            style={{ marginRight: 10 }}
          />
          <FlatButton
            label={messages.save}
            primary
            keyboardFocused
            onClick={close}
          />
        </DialogActions>
      </Dialog>
      <FlatButton
        label={categoryName}
        onClick={open}
        icon={
          <FontIcon color="#777" className="material-icons">
            create
          </FontIcon>
        }
      />
    </>
  )
}

export default ProductCategorySelect
