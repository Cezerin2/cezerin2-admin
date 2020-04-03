import React, { useState } from "react";

import messages from "../../../../lib/text";
import api from "../../../../lib/api";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import "./style.css";

const ActionComponent = () => {
  const [loading, setLoading] = useState(false);

  const handleActionCall = () => {
    const { action, serviceId, fetchServiceLogs } = this.props;
    this.setState({ loading: true });

    return api.webstore.services.actions
      .call(serviceId, action.id)
      .then(({ status, json }) => {
        this.setState({ loading: false });
        fetchServiceLogs();
      })
      .catch(error => {
        alert(error);
        this.setState({ loading: false });
        fetchServiceLogs();
      });
  };

  return (
    <div className="action">
      <div className="row middle-xs">
        <div className="col-xs-7" style={{ fontSize: "14px" }}>
          action.description
        </div>
        <div className="col-xs-5" style={{ textAlign: "right" }}>
          <RaisedButton
            primary
            disabled={this.state.loading}
            onClick={this.handleActionCall}
          />
        </div>
      </div>
    </div>
  );
};

const ServiceActions = ({ actions, serviceId, fetchServiceLogs }) => {
  const buttons = actions.map(index => <ActionComponent key={index} />);

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.serviceActions}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div>{buttons}</div>
      </Paper>
    </div>
  );
};

export default ServiceActions;
