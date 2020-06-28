import { Button, Paper, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../../lib/text"
import ConfirmationDialog from "../../../../../modules/shared/confirmation"
import { MultiSelect } from "../../../../../modules/shared/form"
import style from "./style.module.sass"

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

const EditTokenForm = (props: Readonly<{}>) => {
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)

  const {
    handleSubmit,
    pristine,
    submitting,
    tokenId,
    newToken,
    onDelete,
    onLoad,
  } = props

  const handleRevoke = () => {
    setShowRevokeDialog(true)
  }

  useEffect(() => {
    onLoad()
  }, [])

  const isTokenAdded = !!newToken
  const isAdd = tokenId === null || tokenId === undefined

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper className="paper-box" elevation={1}>
          <div className={style.innerBox}>
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
              <Button
                color="secondary"
                style={{ float: "left" }}
                onClick={handleRevoke}
              >
                {messages.settings_revokeAccess}
              </Button>
            )}
            <Button
              type="submit"
              color="primary"
              className={style.button}
              disabled={pristine || submitting}
            >
              {isAdd ? messages.settings_generateToken : messages.save}
            </Button>
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
    </>
  )
}

export default reduxForm({
  form: "EditTokenForm",
  validate,
  enableReinitialize: true,
})(EditTokenForm)
