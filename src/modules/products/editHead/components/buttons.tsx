import { IconButton } from "@material-ui/core"
import { Delete, OpenInNew } from "@material-ui/icons"
import React, { useState } from "react"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"

const Buttons = (props: Readonly<{ product; onDelete }>) => {
  const [openDelete, setOpenDelete] = useState(false)

  const { product, onDelete } = props

  const handleDelete = () => {
    setOpenDelete(false)
    onDelete()
  }

  const productName =
    product && product.name && product.name.length > 0 ? product.name : "Draft"

  return (
    <>
      <IconButton
        // touch
        // tooltipPosition="bottom-left"
        // tooltip={messages.deleteProduct}
        onClick={() => setOpenDelete(true)}
      >
        <Delete color="primary" className="material-icons" />
      </IconButton>
      {product && product.enabled && (
        <a href={product.url} target="_blank">
          <IconButton
          // touch
          // tooltipPosition="bottom-left"
          // tooltip={messages.viewOnWebsite}
          >
            <OpenInNew color="primary" className="material-icons" />
          </IconButton>
        </a>
      )}
      <DeleteConfirmation
        open={openDelete}
        isSingle
        itemsCount={1}
        itemName={productName}
        onCancel={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />
    </>
  )
}

export default Buttons
