import Paper from "@material-ui/core/Paper"
import { Link } from "@reach/router"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
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
        rightIcon={
          <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
        }
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
      <Paper className="paper-box" zDepth={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </>
  )
}

export default TokensList
