import { Divider, MenuItem } from "@material-ui/core"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import ConfirmationDialog from "../../../../modules/shared/confirmation"
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation"
import ProductSearchDialog from "../../../../modules/shared/productSearch"

const Buttons = (props: Readonly<{}>) => {
  const [showClose, setShowClose] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)

  const showCloses = () => {
    setShowClose(true)
  }

  const hideClose = () => {
    setShowClose(false)
  }

  const setClosed = () => {
    hideClose()
    props.setClosed(props.order.id)
  }

  const showCancels = () => {
    setShowCancel(true)
  }

  const hideCancel = () => {
    setShowCancel(false)
  }

  const setCancelled = () => {
    hideCancel()
    props.setCancelled(props.order.id)
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
    props.holdOrder(props.order.id)
  }

  const resumeOrder = () => {
    props.resumeOrder(props.order.id)
  }

  const showAddItems = () => {
    setShowAddItem(true)
  }

  const hideAddItem = () => {
    setShowAddItem(false)
  }

  const addItem = productId => {
    hideAddItem()
    props.addItem(props.order.id, productId)
  }

  const { settings, order, onDelete } = props

  if (order) {
    const orderName = `${messages.order} #${order.number}`

    const menuItems = []
    if (order.closed) {
      //
    } else if (order.cancelled) {
      //
    } else {
      menuItems.push(
        <MenuItem
          key="addItem"
          primaryText={messages.addOrderItem}
          onClick={showAddItem}
        />
      )
      menuItems.push(<Divider key="dev1" />)
      if (order.hold) {
        menuItems.push(
          <MenuItem
            key="resume"
            primaryText={messages.resumeOrder}
            onClick={resumeOrder}
          />
        )
      } else {
        menuItems.push(
          <MenuItem
            key="hold"
            primaryText={messages.holdOrder}
            onClick={holdOrder}
          />
        )
      }
      menuItems.push(
        <MenuItem
          key="close"
          primaryText={messages.closeOrder}
          onClick={showClose}
        />
      )
      menuItems.push(
        <MenuItem
          key="cancel"
          primaryText={messages.cancelOrder}
          onClick={showCancel}
        />
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
              <FontIcon color="#fff" className="material-icons">
                more_vert
              </FontIcon>
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
