import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import RaisedButton from "material-ui/RaisedButton"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const EmailTemplate = props => {
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
              name="subject"
              floatingLabelText={messages.settings_emailSubject}
            />
            <Field
              component={TextField}
              fullWidth
              name="body"
              multiLine
              floatingLabelText={messages.settings_emailBody}
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

export default reduxForm({ form: "EmailTemplate", enableReinitialize: true })(
  EmailTemplate
)
