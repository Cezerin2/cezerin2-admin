import { Link } from "@reach/router"
import FontIcon from "material-ui/FontIcon"
import IconButton from "material-ui/IconButton"
import React from "react"
import messages from "../../../../lib/text"

const Buttons = () => (
  <span>
    <Link to="/settings/payments/add">
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.settings_addPaymentMethod}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </Link>
  </span>
)

export default Buttons
