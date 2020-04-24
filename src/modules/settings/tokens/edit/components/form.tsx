import React, { useState, useEffect } from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"

import messages from "../../../../../lib/text"
import ConfirmationDialog from "../../../../../modules/shared/confirmation"
import { MultiSelect } from "../../../../../modules/shared/form"

import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import "./style.sass"

const Scopes = [
  "admin",
  "dashboard",
  "read:products",
  "write:products",
  "read:product_categories",
  "write:product_categories",
  "read:orders",
  "write:orders",
  "read:customers",
  "write:customers",
  "read:customer_groups",
  "write:customer_groups",
  "read:pages",
  "write:pages",
  "read:order_statuses",
  "write:order_statuses",
  "read:theme",
  "write:theme",
  "read:sitemap",
  "",
  "read:shipping_methods",
  "write:shipping_methods",
  "read:payment_methods",
  "write:payment_methods",
  "read:settings",
  "write:settings",
  "read:files",
  "write:files",
]

const validate = values => {
  const errors = {}
  const requiredFields = ["name"]

  requiredFields.map(field => {
    if (!values.is_system && values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const EditTokenForm = props => {
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)

  const handleRevoke = () => {
    setShowRevokeDialog(true)
  }

  useEffect(() => props.onLoad(), [])

  const {
    handleSubmit,
    pristine,
    submitting,

    tokenId,
    newToken,
    onDelete,
  } = props
  const isTokenAdded = !!newToken
  const isAdd = tokenId === null || tokenId === undefined

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" zDepth={1}>
          <div className="innerBox">
            <Field
              name="name"
              component={TextField}
              floatingLabelText={messages.settings_tokenName}
              fullWidth
            />
            <Field
              name="email"
              component={TextField}
              floatingLabelText={messages.email}
              fullWidth
              disabled={!isAdd}
              type="email"
            />
            <Field
              name="expiration"
              component={TextField}
              floatingLabelText={messages.settings_tokenExp}
              fullWidth
              type="number"
            />
            <div className="blue-title">{messages.settings_selectScopes}</div>
            <Field
              name="scopes"
              component={MultiSelect}
              items={Scopes}
              disabled={!isAdd}
            />
          </div>
          <div className="buttons-box">
            {!isAdd && (
              <RaisedButton
                label={messages.settings_revokeAccess}
                secondary
                style={{ float: "left" }}
                onClick={handleRevoke}
              />
            )}
            <RaisedButton
              type="submit"
              label={isAdd ? messages.settings_generateToken : messages.save}
              primary
              className="button"
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>

      <ConfirmationDialog
        open={isTokenAdded}
        title={messages.settings_copyYourNewToken}
        description={newToken}
        submitLabel={messages.actions_done}
        cancelLabel={messages.cancel}
        modal
      />

      <ConfirmationDialog
        open={showRevokeDialog}
        title={messages.settings_tokenRevokeTitle}
        description={messages.settings_tokenRevokeDescription}
        onSubmit={onDelete}
        submitLabel={messages.settings_revokeAccess}
        cancelLabel={messages.cancel}
      />
    </div>
  )
}

export default reduxForm({
  form: "EditTokenForm",
  validate,
  enableReinitialize: true,
})(EditTokenForm)
