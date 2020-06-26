import { Button, Paper, TextField } from "@material-ui/core"
import CezerinClient from "cezerin2-client"
import React, { FormEvent, useEffect, useState } from "react"
import messages from "../../lib/text"
import * as auth from "../../lib/webstoreAuth"

const LoginForm = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("webstore_email") || ""
  )
  const [isFetching, setIsFetching] = useState(false)
  const [emailIsSent, setEmailIsSent] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event: FormEvent<{ value: string }>) => {
    setEmail(event.currentTarget.value)
  }

  const handleKeyPress = (event: FormEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setIsFetching(true)
    setEmailIsSent(false)
    setError(null)
  }

  CezerinClient.authorizeInWebStore(
    email,
    `${window.location.origin}/admin`
  ).then(({ status, json }) => {
    setIsFetching(false)
    setEmailIsSent(status === 200)
    setError(status !== 200 && json ? json.message : null)
  })

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
        <Paper className="loginBox" zDepth={1}>
          <div className="loginTitle">{messages.webstoreLoginTitle}</div>
          <div className="loginDescription">{messages.loginDescription}</div>
          <div className="loginInput">
            <TextField
              type="email"
              value={email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              label={messages.email}
              fullWidth
              hintStyle={{ width: "100%" }}
              hintText={messages.email}
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
