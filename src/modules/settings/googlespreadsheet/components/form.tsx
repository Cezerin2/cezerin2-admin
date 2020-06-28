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

  let { handleSubmit, pristine, submitting } = props

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
            className={style.button}
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
