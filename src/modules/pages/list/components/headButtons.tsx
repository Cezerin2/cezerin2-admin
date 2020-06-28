import { IconButton } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { Link } from "@reach/router"
import React from "react"
import messages from "../../../../lib/text"

const Buttons = () => (
  <span>
    <Link to="/pages/add">
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.settings_addPage}
      >
        <Add color="secondary" className="material-icons" />
      </IconButton>
    </Link>
  </span>
)

export default Buttons
