import { IconButton, MenuItem } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import { Link } from "@reach/router"
import IconMenu from "material-ui/IconMenu"
import React from "react"
import messages from "../../../../lib/text"

const WebStoreMenu = () => (
  <IconMenu
    iconButtonElement={
      <IconButton touch>
        <MoreVert color="primary" className="material-icons" />
      </IconButton>
    }
    targetOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
  >
    <MenuItem
      containerElement={<Link to="/apps/account" />}
      primaryText={messages.account}
    />
  </IconMenu>
)

export default WebStoreMenu
