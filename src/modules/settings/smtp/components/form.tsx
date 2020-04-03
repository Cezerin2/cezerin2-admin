import React, { useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";

import messages from "../../../../lib/text";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import "./style.css";

const EmailSettings = props => {
  useEffect(() => props.onLoad());

  const { handleSubmit, pristine, submitting, initialValues } = this.props;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "initial",
        width: "100%"
      }}
    >
      <Paper className="paper-box" zDepth={1}>
        <div className="innerBox">
          <Field
            component={TextField}
            fullWidth
            name="host"
            hintText="smtp.server.com"
            floatingLabelText={messages.settings_smtpHost}
          />
          <div>
            <Field
              component={TextField}
              fullWidth
              name="port"
              type="number"
              hintText="465"
              floatingLabelText={messages.settings_smtpPort}
            />
          </div>
          <div>
            <Field
              component={TextField}
              fullWidth
              name="user"
              floatingLabelText={messages.settings_smtpUser}
            />
          </div>
          <div>
            <Field
              component={TextField}
              fullWidth
              name="pass"
              type="password"
              floatingLabelText={messages.settings_smtpPass}
            />
          </div>
          <div>
            <Field
              component={TextField}
              fullWidth
              name="from_name"
              floatingLabelText={messages.settings_emailFromName}
            />
          </div>
          <div>
            <Field
              component={TextField}
              fullWidth
              name="from_address"
              type="email"
              floatingLabelText={messages.settings_emailFromAddress}
            />
          </div>
        </div>
        <div className="buttons-box">
          <RaisedButton
            type="submit"
            label={messages.save}
            primary
            className="button"
            disabled={pristine || submitting}
          />
        </div>
      </Paper>
    </form>
  );
};

export default reduxForm({
  form: "EmailSettingsForm",
  enableReinitialize: false
})(EmailSettings);
