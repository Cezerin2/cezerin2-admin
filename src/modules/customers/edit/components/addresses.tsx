import React, { useState } from "react"

import messages from "../../../../lib/text"
import ConfirmationDialog from "../../../../modules/shared/confirmation"

import Paper from "material-ui/Paper"
import IconButton from "material-ui/IconButton"
import FontIcon from "material-ui/FontIcon"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import Dialog from "material-ui/Dialog"
import AddressForm from "./addressForm.js"
import "./style.sass"

const Address = ({ address }) => (
  <div className="address">
    {address.full_name}
    {address.company}
    {address.address1}
    {address.address2}
    <>
      {address.city},{" "}
      {address.state && address.state.length > 0 ? `${address.state}, ` : ""}
      {address.postal_code}
    </>
    {address.country}
    {address.phone}
  </div>
)

const iconButtonElement = (
  <IconButton touch>
    <FontIcon color="rgb(189, 189, 189)" className="material-icons">
      more_vert
    </FontIcon>
  </IconButton>
)

const CustomerAddress = props => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const showEditForm = () => {
    setOpenEdit(true)
  }

  const hideEditForm = () => {
    setOpenEdit(false)
  }

  const handleEditForm = address => {
    props.onUpdateAddress(address)
    hideEditForm()
  }

  const showDelete = () => {
    setOpenDelete(true)
  }

  const hideDelete = () => {
    setOpenDelete(false)
  }

  const handleDelete = () => {
    props.onDeleteAddress(props.address.id)
    hideDelete()
  }

  const handleSetDefaultBillingAddress = () => {
    props.onSetDefaultBillingAddress(props.address.id)
  }

  const handleSetDefaultShippingAddress = () => {
    props.onSetDefaultShippingAddress(props.address.id)
  }

  const { address } = props

  let title = messages.address
  if (address.default_billing && address.default_shipping) {
    title = `${messages.shippingAddress} / ${messages.billingAddress}`
  } else if (address.default_billing) {
    title = messages.billingAddress
  } else if (address.default_shipping) {
    title = messages.shippingAddress
  }

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="innerBox" style={{ paddingTop: 15 }}>
        <div className="row middle-xs">
          <div className="col-xs-10">{title}</div>
          <div className="col-xs-2">
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem onClick={showEditForm}>{messages.edit}</MenuItem>
              <MenuItem onClick={showDelete}>
                {messages.actions_delete}
              </MenuItem>
              <MenuItem
                onClick={handleSetDefaultBillingAddress}
                disabled={address.default_billing === true}
              >
                {messages.setDefaultBillingAddress}
              </MenuItem>
              <MenuItem
                onClick={handleSetDefaultShippingAddress}
                disabled={address.default_shipping === true}
              >
                {messages.setDefaultShippingAddress}
              </MenuItem>
            </IconMenu>
          </div>
        </div>
        <Address address={address} />
        <ConfirmationDialog
          open={openDelete}
          title={messages.actions_delete}
          description={messages.messages_deleteConfirmation}
          onSubmit={handleDelete}
          onCancel={hideDelete}
          submitLabel={messages.actions_delete}
          cancelLabel={messages.cancel}
        />
        <Dialog
          title={messages.editAddress}
          modal={false}
          open={openEdit}
          onRequestClose={hideEditForm}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
        >
          <AddressForm
            initialValues={address}
            onCancel={hideEditForm}
            onSubmit={handleEditForm}
          />
        </Dialog>
      </div>
    </Paper>
  )
}

const CustomerAddresses = ({
  customer,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultBillingAddress,
  onSetDefaultShippingAddress,
}) => {
  if (customer && customer.addresses && customer.addresses.length > 0) {
    const addresses = customer.addresses.map((address, index) => (
      <CustomerAddress
        key={index}
        address={address}
        onUpdateAddress={onUpdateAddress}
        onDeleteAddress={onDeleteAddress}
        onSetDefaultBillingAddress={onSetDefaultBillingAddress}
        onSetDefaultShippingAddress={onSetDefaultShippingAddress}
      />
    ))
    return <div>{addresses}</div>
  }
  return null
}

export default CustomerAddresses
