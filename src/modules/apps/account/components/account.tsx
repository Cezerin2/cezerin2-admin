import { Button, TextField } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import React from "react"
import { Field, reduxForm } from "redux-form"
import messages from "../../../../lib/text"
import { CustomToggle } from "../../../../modules/shared/form"
import style from "./style.module.sass"

const AccountForm = ({ handleSubmit, pristine, submitting }) => (
  <div style={{ maxWidth: 720, width: "100%" }}>
    <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
      {messages.account}
    </div>
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%",
      }}
    >
      <Paper style={{ margin: "0px 20px" }} zDepth={1}>
        <div style={{ padding: "10px 30px 30px 30px" }}>
          <Field
            component={TextField}
            fullWidth
            name="email"
            floatingLabelText={messages.email}
          />
          <Field
            component={TextField}
            fullWidth
            name="shop_url"
            floatingLabelText={messages.shopUrl}
          />
          <Field
            component={TextField}
            fullWidth
            name="admin_url"
            floatingLabelText={messages.adminUrl}
          />
          <Field
            component={CustomToggle}
            name="is_developer"
            label={messages.isDeveloper}
            style={{ paddingTop: 16, paddingBottom: 16 }}
          />
        </div>
        <div
          className="buttons-box"
          style={{ display: pristine ? "none" : "block" }}
        >
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
  </div>
)

export default reduxForm({
  form: "WebStoreAccountForm",
  enableReinitialize: true,
})(AccountForm)
