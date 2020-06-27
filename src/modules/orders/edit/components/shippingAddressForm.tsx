import { Button, TextField } from "@material-ui/core"
import React from "react"
import { Field, reduxForm } from "redux-form"
import * as helper from "../../../../lib/helper"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const validate = (values: any) => {
  const errors = {}
  const requiredFields = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const getShippingFieldLabel = ({ label, key }) =>
  label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)

const ShippingAddressForm = (
  props: Readonly<{
    handleSubmit
    pristine
    submitting
    onCancel
    shippingMethod
  }>
) => {
  const { handleSubmit, pristine, submitting, onCancel, shippingMethod } = props

  let shippingFields = null
  if (
    shippingMethod &&
    shippingMethod.fields &&
    shippingMethod.fields.length > 0
  ) {
    shippingFields = shippingMethod.fields.map((field, index) => {
      const fieldLabel = getShippingFieldLabel(field)

      return (
        <Field
          key={index}
          component={TextField}
          fullWidth
          name={field.key}
          floatingLabelText={fieldLabel}
        />
      )
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <>
        {shippingFields}
        <Field
          component={TextField}
          fullWidth
          name="city"
          floatingLabelText={messages.city}
        />
        <div className="row">
          <div className="col-xs-6">
            <Field
              component={TextField}
              fullWidth
              name="state"
              floatingLabelText={messages.state}
            />
          </div>
          <div className="col-xs-6">
            <Field
              component={TextField}
              fullWidth
              name="postal_code"
              floatingLabelText={messages.postal_code}
            />
          </div>
        </div>
        <Field
          component={TextField}
          fullWidth
          name="country"
          floatingLabelText={messages.country}
        />
      </>
      <div className={style.shippingButtons}>
        <Button onClick={onCancel}>{messages.cancel}</Button>
        <Button
          color="primary"
          type="submit"
          style={{ marginLeft: 12 }}
          disabled={pristine || submitting}
        >
          {messages.save}
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: "ShippingAddressForm",
  validate,
  enableReinitialize: true,
})(ShippingAddressForm)
