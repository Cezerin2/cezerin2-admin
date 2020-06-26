import Paper from "@material-ui/core/Paper"
import { Link } from "@reach/router"
import Divider from "material-ui/Divider"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"

const PageItem = ({ page }) => {
  const tags = page.tags && page.tags.length > 0 ? page.tags.join(", ") : ""

  return (
    <>
      <Divider />
      <Link to={`/pages/${page.id}`} style={{ textDecoration: "none" }}>
        <ListItem
          rightIcon={
            <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
          }
          leftIcon={
            page.is_system ? (
              <FontIcon className="material-icons">lock_outline</FontIcon>
            ) : null
          }
          style={!page.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}}
          primaryText={
            <div className="row">
              <div className="col-xs-8">{page.meta_title}</div>
              <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
                {tags}
              </div>
            </div>
          }
        />
      </Link>
    </>
  )
}

const PagesList = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { pages } = props
  const listItems = pages.map((page, index) => (
    <PageItem key={index} page={page} />
  ))

  return (
    <Paper className="paper-box" zDepth={1}>
      <div style={{ width: "100%" }}>
        <List style={{ padding: 0 }}>{listItems}</List>
      </div>
    </Paper>
  )
}

export default PagesList
