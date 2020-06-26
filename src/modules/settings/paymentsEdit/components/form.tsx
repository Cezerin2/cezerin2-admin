import {
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import PaymentGateway from "../../../../modules/settings/paymentGateway"
import { AVAILABLE_PAYMENT_GATEWAYS } from "../../../../modules/settings/paymentGateway/availablePaymentGateways"
import { CustomToggle } from "../../../../modules/shared/form"
import SelectShippingMethodsField from "./selectShipping"
import style from "./style.module.sass"

const validate = (values: any) => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditPaymentMethodForm = (
  props: Readonly<{
    onLoad: Function
    handleSubmit: Function
    pristine: string
    submitting: string
    shippingMethods: string
    methodId: string
    settings: string
  }>
) => {
  const [gateway, setGateway] = useState(null)

  const {
    handleSubmit,
    pristine,
    submitting,
    shippingMethods,
    methodId,
    settings,
  } = props

  useEffect(() => {
    props.onLoad()
  }, [])

  useEffect(() => {
    setGateway(props.initialValues.gateway)
  }, [props.initialValues])

  const onGatewayChange = (gateway: string) => {
    setGateway(gateway)
  }

  const isAdd = methodId === null || methodId === undefined
  const paymentGateways = []
  paymentGateways.push(
    <MenuItem value="" key="none">
      None
    </MenuItem>
  )
  for (const gateway of AVAILABLE_PAYMENT_GATEWAYS) {
    paymentGateways.push(
      <MenuItem value={gateway.key} key={gateway.key}>
        {gateway.name}
      </MenuItem>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper className="paper-box" zDepth={1}>
        <div className={style.innerBox}>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.paymentGateway}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <>
                <Field
                  component={Select}
                  autoWidth
                  fullWidth
                  name="gateway"
                  floatingLabelFixed
                  floatingLabelText={messages.paymentGateway}
                  onChange={(event, currentValue) => {
                    onGatewayChange(currentValue)
                  }}
                >
                  {paymentGateways}
                </Field>
              </>
              <PaymentGateway gateway={gateway} />
            </div>
          </div>

          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.description}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <>
                <Field
                  component={TextField}
                  fullWidth
                  name="name"
                  floatingLabelText={messages.settings_paymentMethodName}
                />
                <Field
                  component={TextField}
                  fullWidth
                  name="description"
                  multiLine
                  floatingLabelText={messages.description}
                />
                <Field
                  component={CustomToggle}
                  name="enabled"
                  label={messages.enabled}
                  style={{ paddingTop: 16, paddingBottom: 20 }}
                />
              </>
              <Divider />
            </div>
          </div>

          <div className="row" style={{ marginTop: "40px" }}>
            <div className="col-xs-12 col-sm-4">
              <div className="blue-title">{messages.settings_conditions}</div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <>
                <Field
                  component={TextField}
                  fullWidth
                  name="conditions.countries"
                  floatingLabelText={messages.settings_countries}
                  hintText="US,UK,AU,SG"
                />
              </>
              <div className="row">
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.subtotal_min"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_minSubtotal} (${settings.currency_symbol})`}
                  />
                </div>
                <div className="col-xs-6">
                  <Field
                    component={TextField}
                    name="conditions.subtotal_max"
                    type="number"
                    fullWidth
                    floatingLabelText={`${messages.settings_maxSubtotal} (${settings.currency_symbol})`}
                  />
                </div>
              </div>
              <div className="gray-title" style={{ marginTop: "30px" }}>
                {messages.settings_onlyShippingMethods}
              </div>
              <Field
                name="conditions.shipping_method_ids"
                component={SelectShippingMethodsField}
                shippingMethods={shippingMethods}
              />
            </div>
          </div>
        </div>
        <div className="buttons-box">
          <Button
            type="submit"
            color="primary"
            className={style.button}
            disabled={pristine || submitting}
          >
            {isAdd ? messages.add : messages.save}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "EditPaymentMethodForm",
  validate,
  enableReinitialize: true,
})(EditPaymentMethodForm)
