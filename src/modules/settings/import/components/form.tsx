import { List, ListItem, Paper } from "@material-ui/core"
import { Link } from "@reach/router"
import FontIcon from "material-ui/FontIcon"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"

const ImportSettings = (props: Readonly<{ onLoad: Function }>) => {
  useEffect(() => {
    onLoad()
  }, [])

  const { onLoad } = props

  return (
    <>
      <Paper className="paper-box" elevation={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>
            <Link
              to="/settings/import/googlespreadsheet"
              style={{ textDecoration: "none" }}
            >
              <ListItem
                rightIcon={
                  <FontIcon className="material-icons">
                    keyboard_arrow_right
                  </FontIcon>
                }
                primaryText={
                  <div className="row">
                    <div className="col-xs-6">
                      {messages.settings_spreadsheet}
                    </div>
                  </div>
                }
              />
            </Link>
          </List>
        </div>
      </Paper>
    </>
  )
}

export default ImportSettings
