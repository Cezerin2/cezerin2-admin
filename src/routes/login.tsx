import { Button, Paper, TextField } from "@material-ui/core"
import CezerinClient from "cezerin2-client"
import React, { useEffect, useState } from "react"
import * as auth from "../lib/auth"
import settings from "../lib/settings"
import messages from "../lib/text"

const LoginForm = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("dashboard_email") || ""
  )
  const [isFetching, setIsFetching] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [emailIsSent, setEmailIsSent] = useState(false)
  const [error, setError] = useState(null)

  const handleKeyPress = (event: { keyCode: number; which: number }) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsFetching(true)
    setIsAuthorized(false)
    setEmailIsSent(false)
    setError(null)

    const authorizeResponse = CezerinClient.authorize(
      settings.apiBaseUrl,
      email
    )
    try {
      setIsFetching(false)
      setIsAuthorized(false)
      setEmailIsSent(authorizeResponse.json.sent)
      setError(authorizeResponse.json.error)
    } catch (error) {
      console.error(error)
      setIsFetching(false)
      setIsAuthorized(false)
      setEmailIsSent(false)
      setError(error)
    }
  }

  useEffect(() => {
    auth.checkTokenFromUrl()
  }, [])

  let response = null
  if (isFetching) {
    response = (
      <div className="loginSuccessResponse">{messages.messages_loading}</div>
    )
  } else if (emailIsSent) {
    response = (
      <div className="loginSuccessResponse">{messages.loginLinkSent}</div>
    )
  } else if (emailIsSent === false && error) {
    response = <div className="loginErrorResponse">{error}</div>
  }

  return (
    <div className="row col-full-height center-xs middle-xs">
      <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
        <Paper className="loginBox" elevation={1}>
          <div className="loginTitle">{messages.loginTitle}</div>
          <div className="loginDescription">{messages.loginDescription}</div>
          <div className="loginInput">
            <TextField
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              onKeyPress={handleKeyPress}
              label={messages.email}
              fullWidth
              style={{ width: "100%" }}
              helperText={messages.email}
            />
          </div>
          <Button
            color="primary"
            disabled={isFetching || emailIsSent}
            onClick={handleSubmit}
          >
            {messages.loginButton}
          </Button>
          {response}
        </Paper>
      </div>
    </div>
  )
}

export default LoginForm
