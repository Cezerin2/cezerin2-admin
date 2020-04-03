import React, { useState, useEffect } from "react";
import { reduxForm } from "redux-form";

import messages from "../../../../lib/text";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import "./style.css";
import { AVAILABLE_PAYMENT_GATEWAYS } from "../availablePaymentGateways";
import GatewaySettings from "./gatewaySettings.js";

const EditPaymentGatewayForm = props => {
  const [open, setOpen] = useState(false);

  useEffect(() => props.onLoad());

  function componentWillReceiveProps(nextProps) {
    if (nextProps.gateway !== this.props.gateway) {
      this.props.onLoad(nextProps.gateway);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleSubmit, pristine, submitting, initialValues } = this.props;
  const gatewayDetails = AVAILABLE_PAYMENT_GATEWAYS.find(
    item => item.key === this.props.gateway
  );

  if (this.props.gateway && this.props.gateway.length > 0) {
    return (
      <div>
        <RaisedButton
          onClick={handleOpen}
          label={messages.drawer_settings}
          style={{ margin: "15px 0 30px 0" }}
        />

        <Dialog
          title={gatewayDetails.name}
          modal={false}
          open={open}
          autoScrollBodyContent
          contentStyle={{ width: 600 }}
          onRequestClose={handleClose}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "initial", width: "100%" }}
          >
            <GatewaySettings gateway={this.props.gateway} />

            <div className="buttons">
              <FlatButton label={messages.cancel} onClick={handleClose} />
              <FlatButton
                label={messages.save}
                primary
                type="submit"
                onClick={this.handleClose}
                style={{ marginLeft: 12 }}
                disabled={pristine || submitting}
              />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
  return null;
};

export default reduxForm({
  form: "EditPaymentGatewayForm",
  enableReinitialize: true
})(EditPaymentGatewayForm);
