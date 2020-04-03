import React, { useState } from "react";
import messages from "./../lib/text";
import CezerinClient from "cezerin2-client";
import settings from "./../lib/settings";
import * as auth from "./../lib/auth";

import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";

const LoginForm = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("dashboard_email") || ""
  );
  const [isFetching, setIsFetching] = useState(false);
  const [emailIsSent, isEmailIsSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      this.handleSubmit();
    }
  };

  const handleSubmit = () => {
    this.setState({
      isFetching: true,
      isAuthorized: false,
      emailIsSent: false,
      error: null
    });

    CezerinClient.authorize(settings.apiBaseUrl, this.state.email)
      .then(authorizeResponse => {
        this.setState({
          isFetching: false,
          isAuthorized: false,
          emailIsSent: authorizeResponse.json.sent,
          error: authorizeResponse.json.error
        });
      })
      .catch(error => {
        this.setState({
          isFetching: false,
          isAuthorized: false,
          emailIsSent: false,
          error
        });
      });
  };

  function componentWillMount() {
    auth.checkTokenFromUrl();
  }

  function componentDidMount() {}

  let response = null;
  if (isFetching) {
    response = (
      <div className="loginSuccessResponse">{messages.messages_loading}</div>
    );
  } else if (emailIsSent) {
    response = (
      <div className="loginSuccessResponse">{messages.loginLinkSent}</div>
    );
  } else if (emailIsSent === false && error) {
    response = <div className="loginErrorResponse">{error}</div>;
  }

  return (
    <div className="row col-full-height center-xs middle-xs">
      <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <Paper className="loginBox" zDepth={1}>
          <div className="loginTitle">{messages.loginTitle}</div>
          <div className="loginDescription">{messages.loginDescription}</div>
          <div className="loginInput">
            <TextField
              type="email"
              value={email}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              fullWidth
              hintStyle={{ width: "100%" }}
              hintText={messages.email}
            />
          </div>
          <RaisedButton
            label={messages.loginButton}
            primary
            disabled={isFetching || emailIsSent}
            onClick={this.handleSubmit}
          />
          {response}
        </Paper>
      </div>
    </div>
  );
};

export default LoginForm;
