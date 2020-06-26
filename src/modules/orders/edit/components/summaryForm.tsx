import { Select, TextField } from "@material-ui/core"
import FlatButton from "material-ui/FlatButton"
import MenuItem from "material-ui/MenuItem"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import api from "../../../../lib/api"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const validate = (values: { [x: string]: any }) => {
  const errors = {}
  const requiredFields: any[] = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const SummaryForm = (props: Readonly<{}>) => {
  const [shippingMethods, setShippingMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])
  const [orderStatuses, setOrderStatuses] = useState([])

  useEffect(() => {
    fetchData(props.initialValues.id)
  }, [])

  const fetchData = (orderId: any) => {
    const filter = {
      order_id: orderId,
    }

    api.orderStatuses.list().then(({ status, json }) => {
      setOrderStatuses(json)
    })

    api.shippingMethods.list(filter).then(({ status, json }) => {
      setShippingMethods(json)
    })

    api.paymentMethods.list(filter).then(({ status, json }) => {
      setPaymentMethods(json)
    })
  }

  const { handleSubmit, pristine, submitting, onCancel } = props

  const statusItems = orderStatuses.map(
    (
      item: { id: any; name: React.ReactNode },
      index: string | number | undefined
    ) => <MenuItem key={index} value={item.id} primaryText={item.name} />
  )
  const shippingItems = shippingMethods.map(
    (
      item: { id: any; name: React.ReactNode },
      index: string | number | undefined
    ) => <MenuItem key={index} value={item.id} primaryText={item.name} />
  )
  const paymentItems = paymentMethods.map(
    (
      item: { id: any; name: React.ReactNode },
      index: string | number | undefined
    ) => <MenuItem key={index} value={item.id} primaryText={item.name} />
  )

  statusItems.push(
    <MenuItem key="none" value={null} primaryText={messages.noOrderStatus} />
  )

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <>
        <Field
          component={Select}
          fullWidth
          name="status_id"
          floatingLabelText={messages.orderStatus}
        >
          {statusItems}
        </Field>

        <Field
          component={TextField}
          fullWidth
          name="tracking_number"
          floatingLabelText={messages.trackingNumber}
        />
        <Field
          component={Select}
          fullWidth
          name="shipping_method_id"
          floatingLabelText={messages.shippingMethod}
        >
          {shippingItems}
        </Field>

        <Field
          component={Select}
          fullWidth
          name="payment_method_id"
          floatingLabelText={messages.paymentsMethod}
        >
          {paymentItems}
        </Field>
        <Field
          component={TextField}
          fullWidth
          name="comments"
          floatingLabelText={messages.customerComment}
        />
        <Field
          component={TextField}
          fullWidth
          name="note"
          floatingLabelText={messages.note}
        />
        <Field
          component={TextField}
          fullWidth
          name="email"
          floatingLabelText={messages.email}
        />
        <Field
          component={TextField}
          fullWidth
          name="mobile"
          floatingLabelText={messages.mobile}
        />
      </>
      <div className={style.shippingButtons}>
        <FlatButton label={messages.cancel} onClick={onCancel} />
        <FlatButton
          label={messages.save}
          primary
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: "SummaryForm",
  validate,
  enableReinitialize: true,
})(SummaryForm)
