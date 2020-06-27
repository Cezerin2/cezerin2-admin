import { List, ListItem } from "@material-ui/core"
import { Folder, Settings } from "@material-ui/icons"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import messages from "../../../lib/text"

const styles = {
  selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  innerItem: {
    paddingLeft: 55,
  },
}

const FolderIcon = <Folder className="material-icons" />

const StatusesList = (props: Readonly<{}>) => {
  const { onSelect, selectedId, items, showAll, showManage, onLoad } = props

  useEffect(() => {
    onLoad()
  }, [])

  const rows = items.map(
    (item: { id: string | number | undefined; name: React.ReactNode }) => (
      <ListItem
        key={item.id}
        className="treeItem"
        style={item.id === selectedId ? styles.selectedItem : null}
        innerDivStyle={styles.innerItem}
        primaryText={item.name}
        leftIcon={FolderIcon}
        onClick={() => onSelect(item.id)}
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
          onClick={() => onSelect("all")}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/orders/statuses" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            innerDivStyle={styles.innerItem}
            leftIcon={<Settings className="material-icons" />}
          >
            {messages.manageOrderStatuses}
          </ListItem>
        </Link>
      )}
    </List>
  )
}

export default StatusesList
