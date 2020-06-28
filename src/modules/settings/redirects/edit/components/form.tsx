import { Button, Paper, TextField } from "@material-ui/core"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../../lib/text"
import style from "./style.module.sass"

const validate = (values: {}) => {
  const errors = {}
  const requiredFields = ["from", "to"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditRedirectForm = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { handleSubmit, pristine, submitting, redirectId } = props
  const isAdd = redirectId === null || redirectId === undefined

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={1}>
          <div className={style.innerBox}>
            <Field
              name="from"
              component={TextField}
              floatingLabelText="From (e.g. /old-path)"
              fullWidth
            />
            <Field
              name="to"
              component={TextField}
              floatingLabelText="To (e.g. /new-path)"
              fullWidth
            />
          </div>
          <div
            className={`buttons-box ${
              pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show"
            }`}
          >
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
    </>
  )
}

export default reduxForm({
  form: "EditRedirectForm",
  validate,
  enableReinitialize: true,
})(EditRedirectForm)
