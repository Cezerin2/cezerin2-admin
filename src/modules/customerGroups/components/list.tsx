import { List, ListItem } from "@material-ui/core"
import { Clear, Folder, Settings } from "@material-ui/icons"
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

const Groups = (props: {
  onLoad?: any
  onSelect: any
  selectedId?: any
  items?: any
  showAll?: any
  showRoot?: any
  showManage?: any
}) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { onSelect, selectedId, items, showAll, showRoot, showManage } = props

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
          props.onSelect(item.id)
        }}
      />
    )
  )

  return (
    <List>
      {showRoot && (
        <ListItem
          className="treeItem"
          primaryText={messages.customers_noGroup}
          style={selectedId === "root" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<Clear className="material-icons" />}
          onClick={() => onSelect("root")}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={messages.customerGroups_all}
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
        <Link to="/customers/groups" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            innerDivStyle={styles.innerItem}
            leftIcon={<Settings className="material-icons" />}
          >
            {messages.customerGroups_titleEditMany}
          </ListItem>
        </Link>
      )}
    </List>
  )
}

export default Groups
