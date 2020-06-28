import { Button, Paper, Radio, RadioGroup, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const radioButtonStyle = {
  marginTop: 14,
  marginBottom: 14,
}

const CheckoutFieldForm = (
  props: Readonly<{
    handleSubmit: Function
    pristine: string
    submitting: string
    onLoad: Function
  }>
) => {
  const { handleSubmit, pristine, submitting, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper className="paper-box" elevation={1}>
        <div className={style.innerBox}>
          <Field
            component={TextField}
            fullWidth
            name="label"
            floatingLabelText={messages.settings_fieldLabel}
          />
          <Field
            component={TextField}
            fullWidth
            name="placeholder"
            floatingLabelText={messages.settings_fieldPlaceholder}
          />
          <div className="blue-title">{messages.settings_fieldStatus}</div>
          <Field name="status" component={RadioGroup}>
            <Radio
              value="required"
              label={messages.settings_fieldRequired}
              style={radioButtonStyle}
            />
            <Radio
              value="optional"
              label={messages.settings_fieldOptional}
              style={radioButtonStyle}
            />
            <Radio
              value="hidden"
              label={messages.settings_fieldHidden}
              style={radioButtonStyle}
            />
          </Field>
        </div>
        <div className="buttons-box">
          <Button
            type="submit"
            label={messages.save}
            color="primary"
            className={style.button}
            disabled={pristine || submitting}
          />
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "CheckoutFieldForm",
  enableReinitialize: true,
})(CheckoutFieldForm)
