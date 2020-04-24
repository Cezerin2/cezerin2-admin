import React, { useState } from "react"
import moment from "moment"

import messages from "../../../../lib/text"

import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import Dialog from "material-ui/Dialog"
import SummaryForm from "./summaryForm.js"
import "./style.sass"

const getOrderStates = order => {
  const states = []

  if (order.hold) {
    states.push(
      <span key="hold" className="holdState">
        {messages.orders_hold}
      </span>
    )
  }

  if (order.paid) {
    states.push(
      <span key="paid" className="paidState">
        {messages.orders_paid}
      </span>
    )
  }

  if (order.delivered) {
    states.push(
      <span key="delivered" className="deliveredState">
        {messages.orders_delivered}
      </span>
    )
  }

  if (order.cancelled) {
    return [
      <span key="cancelled" className="cancelledState">
        {messages.orders_cancelled}
      </span>,
    ]
  }

  if (order.closed) {
    return [
      <span key="closed" className="closedState">
        {messages.orders_closed}
      </span>,
    ]
  }

  if (states.length === 0 && order.draft) {
    states.unshift(
      <span key="draft" className="draftState">
        {messages.orders_draft}
      </span>
    )
  }

  return states
}

const OrderSummary = props => {
  const [openSummaryEdit, setOpenSummaryEdit] = useState(false)

  const showSummaryEdit = () => {
    setOpenSummaryEdit(true)
  }

  const hideSummaryEdit = () => {
    setOpenSummaryEdit(false)
  }

  const saveSummaryEdit = order => {
    props.onOrderSummaryUpdate(order)
    hideSummaryEdit()
  }

  const { order, settings, onCheckout, processingCheckout } = props
  const allowEdit = order.closed === false && order.cancelled === false
  const isDraft = order.draft === true
  const dateCreated = moment(order.date_placed || order.date_created)
  const dateCreatedFormated = dateCreated.format(
    `${settings.date_format}, ${settings.time_format}`
  )
  const states = getOrderStates(order)

  let referrerDomain = order.referrer_url

  try {
    const url = new URL(order.referrer_url)
    referrerDomain = url.hostname
  } catch (e) {}

  const referrerLink =
    order.referrer_url && order.referrer_url.includes("http") ? (
      <a className="link" href={order.referrer_url} target="_blank">
        {referrerDomain}
      </a>
    ) : (
      order.referrer_url
    )

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="innerBox">
        <div className="states">{states}</div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.orderDate}</span>
          </div>
          <div className="col-xs-7">{dateCreatedFormated}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.orderStatus}</span>
          </div>
          <div className="col-xs-7">{order.status}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.referrer}</span>
          </div>
          <div className="col-xs-7">{referrerLink}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.trackingNumber}</span>
          </div>
          <div className="col-xs-7">{order.tracking_number}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.shippingStatus}</span>
          </div>
          <div className="col-xs-7">{order.shipping_status}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.shippingMethod}</span>
          </div>
          <div className="col-xs-7">{order.shipping_method}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.paymentsMethod}</span>
          </div>
          <div className="col-xs-7">{order.payment_method}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.customerComment}</span>
          </div>
          <div className="col-xs-7">{order.comments}</div>
        </div>

        <div className={`$"summaryRow} row`}>
          <div className="col-xs-5">
            <span>{messages.note}</span>
          </div>
          <div className="col-xs-7">{order.note}</div>
        </div>

        <div style={{ marginTop: 20 }}>
          {allowEdit && (
            <RaisedButton
              label="Edit"
              style={{ marginRight: 15 }}
              onClick={showSummaryEdit}
            />
          )}
          {isDraft && (
            <RaisedButton
              label={messages.placeOrder}
              primary
              onClick={onCheckout}
              disabled={processingCheckout}
            />
          )}
        </div>

        <Dialog
          title={messages.order}
          modal={false}
          open={openSummaryEdit}
          onRequestClose={hideSummaryEdit}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
        >
          <SummaryForm
            initialValues={order}
            onCancel={hideSummaryEdit}
            onSubmit={saveSummaryEdit}
          />
        </Dialog>
      </div>
    </Paper>
  )
}

export default OrderSummary
