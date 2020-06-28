import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import RaisedButton from "material-ui/RaisedButton"
import React, { useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../../lib/text"
import { CustomToggle, MultiSelect } from "../../../../../modules/shared/form"
import style from "./style.module.sass"

const WEBHOOK_EVENTS = [
  "order.created",
  "order.updated",
  "order.deleted",
  "transaction.created",
  "transaction.updated",
  "transaction.deleted",
  "customer.created",
  "customer.updated",
  "customer.deleted",
]

const validate = values => {
  const errors = {}
  const requiredFields = ["url"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditWebhookForm = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { handleSubmit, pristine, submitting, initialValues, webhookId } = props
  const isAdd = webhookId === null || webhookId === undefined

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={1}>
          <div className={style.innerBox}>
            <Field
              name="description"
              component={TextField}
              floatingLabelText={messages.description}
              fullWidth
              multiLine
            />
            <Field
              name="url"
              component={TextField}
              floatingLabelText="URL"
              fullWidth
            />
            <Field
              name="secret"
              component={TextField}
              floatingLabelText={messages.webhookSecret}
              fullWidth
            />
            <div style={{ maxWidth: 256 }}>
              <Field
                component={CustomToggle}
                name="enabled"
                label={messages.enabled}
                style={{ paddingTop: 16, paddingBottom: 16 }}
              />
            </div>
            <div className="blue-title">{messages.webhookEvents}</div>
            <Field
              name="events"
              component={MultiSelect}
              items={WEBHOOK_EVENTS}
              columns={3}
            />
          </div>
          <div
            className={`buttons-box ${
              pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show"
            }`}
          >
            <RaisedButton
              type="submit"
              label={isAdd ? messages.add : messages.save}
              primary
              className={style.button}
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    </>
  )
}

export default reduxForm({
  form: "EditWebhookForm",
  validate,
  enableReinitialize: true,
})(EditWebhookForm)
