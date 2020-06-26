import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import FlatButton from "material-ui/FlatButton"
import FontIcon from "material-ui/FontIcon"
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

const CategoryItem = ({ categoryName, actions }) => (
  <span className="react-tagsinput-tag">
    {categoryName}
    {actions}
  </span>
)

const ProductCategoryMultiSelect = (props: Readonly<{}>) => {
  const [open, setOpen] = useState(false)

  const close = () => {
    setOpen(false)
  }

  const opens = () => {
    setOpen(true)
  }

  const handleCheck = categoryId => {
    const selectedIds = props.fields.getAll()
    if (selectedIds && selectedIds.includes(categoryId)) {
      // remove
      props.fields.forEach((name, index, fields) => {
        if (fields.get(index) === categoryId) {
          fields.remove(index)
        }
      })
    } else {
      // add
      props.fields.push(categoryId)
    }
  }

  const {
    categories,
    fields,
    meta: { touched, error, submitFailed },
  } = props
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
          style={{ minWidth: 52 }}
          onClick={open}
          icon={
            <FontIcon color="#333" className="material-icons">
              add
            </FontIcon>
          }
        />
      </span>
    </div>
  )
}

export default ProductCategoryMultiSelect
