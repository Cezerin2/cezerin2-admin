import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import RaisedButton from "material-ui/RaisedButton"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const EmailSettings = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { handleSubmit, pristine, submitting } = props

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
          <RaisedButton
            type="submit"
            label={messages.save}
            primary
            className={style.button}
            disabled={pristine || submitting}
          />
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "EmailSettingsForm",
  enableReinitialize: false,
})(EmailSettings)
