import { Button, Paper, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const EmailSettings = (
  props: Readonly<{ handleSubmit; pristine; submitting; onLoad }>
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
          <>
            <Field
              component={TextField}
              fullWidth
              name="host"
              hintText="smtp.server.com"
              floatingLabelText={messages.settings_smtpHost}
            />
            <Field
              component={TextField}
              fullWidth
              name="port"
              type="number"
              hintText="465"
              floatingLabelText={messages.settings_smtpPort}
            />
            <Field
              component={TextField}
              fullWidth
              name="user"
              floatingLabelText={messages.settings_smtpUser}
            />
            <Field
              component={TextField}
              fullWidth
              name="pass"
              type="password"
              floatingLabelText={messages.settings_smtpPass}
            />
            <Field
              component={TextField}
              fullWidth
              name="from_name"
              floatingLabelText={messages.settings_emailFromName}
            />
            <Field
              component={TextField}
              fullWidth
              name="from_address"
              type="email"
              floatingLabelText={messages.settings_emailFromAddress}
            />
          </>
        </div>
        <div className="buttons-box">
          <Button
            type="submit"
            color="primary"
            className={style.button}
            disabled={pristine || submitting}
          >
            {messages.save}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "EmailSettingsForm",
  enableReinitialize: false,
})(EmailSettings)
