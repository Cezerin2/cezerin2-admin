import { Link } from "@reach/router"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import React from "react"
import messages from "../../../../lib/text"

const WebStoreMenu = () => (
  <IconMenu
    iconButtonElement={
      <IconButton touch>
        <FontIcon color="#fff" className="material-icons">
          more_vert
        </FontIcon>
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
