import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import messages from "../../../lib/text"

const styles = {
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  innerItem: {
    paddingLeft: 55,
  },
}

const FolderIcon = <FontIcon className="material-icons">folder</FontIcon>

const StatusesList = (props: Readonly<{}>) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { onSelect, selectedId, items, showAll, showManage } = props

  const rows = items.map(
    (item: { id: string | number | undefined; name: React.ReactNode }) => (
      <ListItem
        key={item.id}
        className="treeItem"
        style={item.id === selectedId ? styles.selectedItem : null}
        innerDivStyle={styles.innerItem}
        primaryText={item.name}
        leftIcon={FolderIcon}
        onClick={() => {
          onSelect(item.id)
        }}
      />
    )
  )

  return (
    <List>
      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={messages.allOrderStatuses}
          style={selectedId === "all" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={FolderIcon}
          onClick={() => {
            onSelect("all")
          }}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/orders/statuses" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.manageOrderStatuses}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
        </Link>
      )}
    </List>
  )
}

export default StatusesList
