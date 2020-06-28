import { Button, Dialog, DialogActions } from "@material-ui/core"
import { Create } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import CategorySelect from "../../../../../modules/productCategories/select"

const ProductCategorySelect = (props: Readonly<{}>) => {
  const [open, setOpen] = useState(false)

  const { categories, input } = props

  const close = () => {
    setOpen(false)
  }

  const constopen = () => {
    setOpen(true)
  }

  const handleSelect = (categoryId: string) => {
    input.onChange(categoryId)
  }

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
          <Button onClick={close} style={{ marginRight: 10 }}>
            {messages.cancel}
          </Button>
          <Button color="primary" keyboardFocused onClick={close}>
            {messages.save}
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={open}
        icon={<Create color="primary" className="material-icons" />}
      >
        {categoryName}
      </Button>
    </>
  )
}

export default ProductCategorySelect
