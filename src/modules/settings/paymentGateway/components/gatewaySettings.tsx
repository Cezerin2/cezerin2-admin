import { MenuItem, Select, TextField } from "@material-ui/core"
import React from "react"
import { Field } from "redux-form"

const GatewaySettings = (props: { gateway: string }) => {
  const { gateway } = props
  switch (gateway) {
    case "paypal-checkout":
      return <PayPalButton />
    case "liqpay":
      return <LiqPay />
    case "stripe-elements":
      return <StripeElements />
    default:
      return null
  }
}

export default GatewaySettings

const PayPalButton = () => (
  <>
    <Field
      component={Select}
      name="env"
      floatingLabelText="Environment"
      fullWidth
      autoWidth
    >
      <MenuItem value="production">production</MenuItem>
      <MenuItem value="sandbox">sandbox</MenuItem>
    </Field>

    <Field
      component={TextField}
      name="client"
      floatingLabelText="Client ID"
      fullWidth
    />

    <Field
      component={Select}
      name="size"
      floatingLabelText="Button size"
      fullWidth
      autoWidth
    >
      <MenuItem value="small">small</MenuItem>
      <MenuItem value="medium">medium</MenuItem>
      <MenuItem value="large">large</MenuItem>
      <MenuItem value="responsive">responsive</MenuItem>
    </Field>

    <Field
      component={Select}
      name="shape"
      floatingLabelText="Button shape"
      fullWidth
      autoWidth
    >
      <MenuItem value="pill">pill</MenuItem>
      <MenuItem value="rect">rect</MenuItem>
    </Field>

    <Field
      component={Select}
      name="color"
      floatingLabelText="Button color"
      fullWidth
      autoWidth
    >
      <MenuItem value="gold">gold</MenuItem>
      <MenuItem value="blue">blue</MenuItem>
      <MenuItem value="silver">silver</MenuItem>
      <MenuItem value="black">black</MenuItem>
    </Field>

    <Field
      component={TextField}
      name="notify_url"
      floatingLabelText="Notify URL"
      hintText="https://<domain>/api/v1/notifications/paypal-checkout"
      fullWidth
    />
  </>
)

const LiqPay = () => (
  <>
    <Field
      component={TextField}
      name="public_key"
      floatingLabelText="Public Key"
      fullWidth
    />

    <Field
      component={TextField}
      name="private_key"
      floatingLabelText="Private Key"
      fullWidth
    />

    <Field
      component={Select}
      name="language"
      floatingLabelText="Language"
      fullWidth
      autoWidth
    >
      <MenuItem value="ru">Russian</MenuItem>
      <MenuItem value="uk">Ukrainian</MenuItem>
      <MenuItem value="en">English</MenuItem>
    </Field>

    <Field
      component={TextField}
      name="server_url"
      floatingLabelText="Server URL"
      hintText="https://<domain>/api/v1/notifications/liqpay"
      fullWidth
    />
  </>
)

const StripeElements = () => (
  <>
    <Field
      component={Select}
      name="env"
      floatingLabelText="Environment"
      fullWidth
      autoWidth
    >
      <MenuItem value="production">production</MenuItem>
      <MenuItem value="sandbox">sandbox</MenuItem>
    </Field>
    <Field
      component={TextField}
      name="public_key"
      floatingLabelText="Publishable key"
      fullWidth
    />
    <Field
      component={TextField}
      name="secret_key"
      floatingLabelText="Secret key"
      fullWidth
    />
  </>
)
