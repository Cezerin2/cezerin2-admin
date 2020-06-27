import { Divider, IconButton, MenuItem } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import IconMenu from "material-ui/IconMenu"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import ConfirmationDialog from "../../../../modules/shared/confirmation"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import ProductSearchDialog from "../../../../modules/shared/productSearch"

const Buttons = (
  props: Readonly<{ setCancelled; setClosed; settings; order; onDelete }>
) => {
  const [showClose, setShowClose] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)

  const { setCancelled, setClosed, settings, order, onDelete } = props

  const showCloses = () => {
    setShowClose(true)
  }

  const hideClose = () => {
    setShowClose(false)
  }

  const setClosed = () => {
    hideClose()
    setClosed(order.id)
  }

  const showCancels = () => {
    setShowCancel(true)
  }

  const hideCancel = () => {
    setShowCancel(false)
  }

  const setCancelled = () => {
    hideCancel()
    setCancelled(order.id)
  }

  const openDeletes = () => {
    setOpenDelete(true)
  }

  const closeDelete = () => {
    setOpenDelete(false)
  }

  const deleteOrder = () => {
    closeDelete()
    onDelete()
  }

  const holdOrder = () => {
    holdOrder(order.id)
  }

  const resumeOrder = () => {
    resumeOrder(order.id)
  }

  const showAddItems = () => {
    setShowAddItem(true)
  }

  const hideAddItem = () => {
    setShowAddItem(false)
  }

  const addItem = productId => {
    hideAddItem()
    addItem(order.id, productId)
  }

  if (order) {
    const orderName = `${messages.order} #${order.number}`

    const menuItems = []
    if (order.closed) {
      //
    } else if (order.cancelled) {
      //
    } else {
      menuItems.push(
        <MenuItem key="addItem" onClick={showAddItem}>
          {messages.addOrderItem}
        </MenuItem>
      )
      menuItems.push(<Divider key="dev1" />)
      if (order.hold) {
        menuItems.push(
          <MenuItem key="resume" onClick={resumeOrder}>
            {messages.resumeOrder}
          </MenuItem>
        )
      } else {
        menuItems.push(
          <MenuItem key="hold" onClick={holdOrder}>
            {messages.holdOrder}
          </MenuItem>
        )
      }
      menuItems.push(
        <MenuItem key="close" onClick={showClose}>
          {messages.closeOrder}
        </MenuItem>
      )
      menuItems.push(
        <MenuItem key="cancel" onClick={showCancel}>
          {messages.cancelOrder}
        </MenuItem>
      )
    }

    return (
      <span>
        <ProductSearchDialog
          open={showAddItem}
          title={messages.addOrderItem}
          settings={settings}
          onSubmit={addItem}
          onCancel={hideAddItem}
          submitLabel={messages.add}
          cancelLabel={messages.cancel}
        />
        <ConfirmationDialog
          open={showClose}
          title={orderName}
          description={messages.closeOrderConfirmation}
          onSubmit={setClosed}
          onCancel={hideClose}
          submitLabel={messages.closeOrder}
          cancelLabel={messages.cancel}
        />
        <ConfirmationDialog
          open={showCancel}
          title={orderName}
          description={messages.cancelOrderConfirmation}
          onSubmit={setCancelled}
          onCancel={hideCancel}
          submitLabel={messages.cancelOrder}
          cancelLabel={messages.cancel}
        />
        <DeleteConfirmation
          open={openDelete}
          isSingle
          itemsCount={1}
          itemName={orderName}
          onCancel={closeDelete}
          onDelete={deleteOrder}
        />
        <IconMenu
          iconButtonElement={
            <IconButton touch>
              <MoreVert color="#fff" className="material-icons" />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {menuItems}
          <MenuItem primaryText={messages.deleteOrder} onClick={openDeletes} />
        </IconMenu>
      </span>
    )
  }
  return <span />
}

export default Buttons
