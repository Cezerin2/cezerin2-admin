import { Dialog, IconButton, MenuItem, Paper } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import IconMenu from "material-ui/IconMenu"
import React, { useState } from "react"
import messages from "../../../../lib/text"
import ConfirmationDialog from "../../../../modules/shared/confirmation"
import AddressForm from "./addressForm"
import style from "./style.module.sass"

const Address = ({ address }) => (
  <div className={style.address}>
    <>{address.full_name}</>
    <>{address.company}</>
    <>{address.address1}</>
    <>{address.address2}</>
    <>
      {address.city},{" "}
      {address.state && address.state.length > 0 ? `${address.state}, ` : ""}
      {address.postal_code}
    </>
    <>{address.country}</>
    <>{address.phone}</>
  </div>
)

const iconButtonElement = (
  <IconButton touch>
    <MoreVert color="rgb(189, 189, 189)" className="material-icons" />
  </IconButton>
)

const CustomerAddress = (props: Readonly<{}>) => {
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
    <Paper className="paper-box" elevation={1}>
      <div className={style.innerBox} style={{ paddingTop: 15 }}>
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
          <div style={{ width: "500px", margin: "25px" }}>
            <AddressForm
              initialValues={address}
              onCancel={hideEditForm}
              onSubmit={handleEditForm}
            />
          </div>
        </Dialog>
      </div>
    </Paper>
  )
}

const CustomerAddresses = (props: Readonly<{}>) => {
  const {
    customer,
    onUpdateAddress,
    onDeleteAddress,
    onSetDefaultBillingAddress,
    onSetDefaultShippingAddress,
  } = props

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
    return <>{addresses}</>
  }
  return null
}

export default CustomerAddresses
