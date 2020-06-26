import { Link } from "@reach/router"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import messages from "../../../../../lib/text"

const Buttons = () => (
  <span>
    <Link to="/settings/redirects/add">
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.redirectAdd}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </Link>
  </span>
)

export default Buttons
