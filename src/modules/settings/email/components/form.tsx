import { List, ListItem, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"

const EmailSettings = (props: Readonly<{}>) => {
  const { emailSettings, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const smtpHint =
    emailSettings && emailSettings.host && emailSettings.host.length > 0
      ? emailSettings.host
      : "none"

  return (
    <>
      <Paper className="paper-box" elevation={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link to="/settings/email/smtp" style={{ textDecoration: "none" }}>
              <ListItem
                rightIcon={<KeyboardArrowRight className="material-icons" />}
                primaryText={
                  <div className="row">
                    <div className="col-xs-6">
                      {messages.settings_smtpSettings}
                    </div>
                    <div
                      className="col-xs-6"
                      style={{ color: "rgba(0, 0, 0, 0.4)" }}
                    >
                      {smtpHint}
                    </div>
                  </div>
                }
              />
            </Link>
          </List>
        </div>
      </Paper>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_emailTemplates}
      </div>
      <Paper className="paper-box" elevation={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link
              to="/settings/email/templates/order_confirmation"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight className="material-icons" />}
              >
                {messages.settings_orderConfirmation}
              </ListItem>
            </Link>
            <Link
              to="/settings/email/templates/register_doi_en"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={<KeyboardArrowRight className="material-icons" />}
              >
                {messages.settings_customerRegistration}
              </ListItem>
            </Link>
            {/* <Link
								to="/settings/email/templates/register_doi_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link>
							<Link
								to="/settings/email/templates/register_doi_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link> */}
            <Link
              to="/settings/email/templates/forgot_password_en"
              style={{ textDecoration: "none" }}
            >
              <ListItem rightIcon={<FontIcon className="material-icons" />}>
                {messages.settings_customerRecovery}
              </ListItem>
            </Link>
            {/* <Link
								to="/settings/email/templates/forgot_password_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link>
							<Link
								to="/settings/email/templates/forgot_password_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link> */}
          </List>
        </div>
      </Paper>
    </>
  )
}

export default EmailSettings
