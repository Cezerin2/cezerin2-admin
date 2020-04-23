import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"

import messages from "../../../../lib/text"
import "./style.sass"

import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"

const EmailSettings = props => {
  useEffect(() => props.onLoad(), [])

  let { handleSubmit, pristine, submitting } = props

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper className="paper-box" zDepth={1}>
        <div className="innerBox">
          <Field
            component={TextField}
            fullWidth={true}
            name="apikey"
            hintText="..apiKey"
            floatingLabelText={messages.settings_apikey}
          />
          <Field
            component={TextField}
            fullWidth={true}
            name="sheetid"
            hintText="..sheet-id"
            floatingLabelText={messages.settings_sheetid}
          />
          <Field
            component={TextField}
            fullWidth={true}
            name="range"
            floatingLabelText={messages.settings_tablename}
          />
        </div>
        <div className="buttons-box">
          <RaisedButton
            type="submit"
            label={messages.save}
            primary={true}
            className="button"
            disabled={pristine || submitting}
          />
        </div>
      </Paper>
    </form>
  )
}

export default reduxForm({
  form: "ImportSettingsForm",
  enableReinitialize: false,
})(EmailSettings)
