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
          leftIcon={<FontIcon className="material-icons">clear</FontIcon>}
          onClick={() => {
            onSelect("root")
          }}
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
            primaryText={messages.customerGroups_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
        </Link>
      )}
    </List>
  )
}

export default Groups
