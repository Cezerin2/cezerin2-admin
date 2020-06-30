import { Button, Dialog, DialogActions } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import React, { useState } from "react"
import messages from "../../../../../lib/text"
import CategoryMultiselect from "../../../../../modules/productCategories/components/multiselectList"

const CategoryItemActions = ({
  fields,
  index,
}: {
  fields: { remove: Function }
  index: string
}) => (
  <a
    title={messages.actions_delete}
    onClick={() => fields.remove(index)}
    className="react-tagsinput-remove"
  />
)

const CategoryItem = ({ categoryName, actions }: { categoryName; actions }) => (
  <span className="react-tagsinput-tag">
    {categoryName}
    {actions}
  </span>
)

const ProductCategoryMultiSelect = (
  props: Readonly<{ categories; fields }>
) => {
  const [open, setOpen] = useState(false)

  const { categories, fields } = props

  const handleCheck = (categoryId: string) => {
    const selectedIds = fields.getAll()
    if (selectedIds && selectedIds.includes(categoryId)) {
      // remove
      fields.forEach((name, index, fields) => {
        if (fields.get(index) === categoryId) {
          fields.remove(index)
        }
      })
    } else {
      // add
      fields.push(categoryId)
    }
  }

  const selectedIds = fields.getAll()

  return (
    <div className="react-tagsinput">
      <span>
        {fields.map((field, index) => {
          const categoryId = fields.get(index)
          const category = categories.find(item => item.id === categoryId)
          const categoryName = category ? category.name : "-"
          const actions = <CategoryItemActions fields={fields} index={index} />
          return (
            <CategoryItem
              key={index}
              categoryName={categoryName}
              actions={actions}
            />
          )
        })}
        <Dialog
          title={messages.additionalCategories}
          modal={false}
          open={open}
          onRequestClose={close}
          autoScrollBodyContent
        >
          <CategoryMultiselect
            items={categories}
            selectedIds={selectedIds}
            opened={false}
            onCheck={handleCheck}
          />
          <DialogActions>
            <Button onClick={close} style={{ marginRight: 10 }}>
              {messages.cancel}
            </Button>
            <Button
              color="primary"
              keyboardFocused
              onClick={() => setOpen(false)}
            >
              {messages.save}
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          style={{ minWidth: 52 }}
          onClick={() => setOpen(true)}
          icon={<Add color="primary" className="material-icons" />}
        ></Button>
      </span>
    </div>
  )
}

export default ProductCategoryMultiSelect
