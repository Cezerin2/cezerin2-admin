import { Divider, List, ListItem, Paper } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import messages from "../../../../../lib/text"

const TokenItem = ({ token }) => (
  <>
    <Divider />
    <Link
      to={`/settings/tokens/${token.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={<KeyboardArrowRight className="material-icons" />}
        primaryText={
          <div className="row">
            <div className="col-xs-6">{token.name}</div>
            <div className="col-xs-6" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              {token.email}
            </div>
          </div>
        }
      />
    </Link>
  </>
)

const TokensList = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { tokens } = props
  const listItems = tokens.map((token, index) => (
    <TokenItem key={index} token={token} />
  ))

  return (
    <>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.settings_tokenHelp}
      </div>
      <Paper className="paper-box" elevation={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default TokensList
