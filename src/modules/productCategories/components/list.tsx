import { List, ListItem } from "@material-ui/core"
import { Folder, VisibilityOff } from "@material-ui/icons"
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
  nestedListStyle: {
    padding: "0 0 0 15px",
  },
}

const FolderIcon = <Folder className="material-icons" />
const DraftIcon = <VisibilityOff className="material-icons" />

const Item = (props: Readonly<{}>) => {
  const handleClick = () => {
    const { item, onSelect } = props
    onSelect(item.id)
  }

  const { item, opened, selectedId, nestedItems } = props
  const icon = item.enabled ? FolderIcon : DraftIcon
  const style = item.id === selectedId ? styles.selectedItem : null

  return (
    <ListItem
      className="treeItem"
      initiallyOpen={opened}
      style={style}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      nestedItems={nestedItems}
      leftIcon={icon}
      onClick={handleClick}
      nestedListStyle={styles.nestedListStyle}
    />
  )
}

const Categories = (props: Readonly<{}>) => {
  const {
    selectedId,
    items,
    showAll = false,
    showRoot = false,
    showManage = false,
    showImport = true,
    rootName = messages.productCategories_root,
    allName = messages.productCategories_all,
    opened = false,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  function getItem(selectedId, allItems, item, opened) {
    const nestedItems = getChildren(selectedId, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedId={selectedId}
        nestedItems={nestedItems}
        onSelect={props.onSelect}
      />
    )
  }

  function getChildren(selectedId, allItems, id, opened) {
    if (allItems && id) {
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => getItem(selectedId, allItems, item, opened))
    }
    return []
  }

  const handleClickAll = () => {
    props.onSelect("all")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickRoot = () => {
    props.onSelect("root")
    document.getElementsByClassName("product-list")[0].style.display = "block"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "none"
    }
  }

  const handleClickImport = () => {
    document.getElementsByClassName("product-list")[0].style.display = "none"
    if (
      document.getElementsByClassName("spread-sheet-container")[0] !== undefined
    ) {
      document.getElementsByClassName(
        "spread-sheet-container"
      )[0].style.display = "block"
    }
  }

  const rows = items
    .filter(item => item.parent_id === null)
    .map(item => getItem(selectedId, items, item, opened))

  return (
    <List>
      {showRoot && (
        <ListItem
          primaryText={rootName}
          style={selectedId === "root" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<FontIcon className="material-icons">home</FontIcon>}
          onClick={handleClickRoot}
        />
      )}

      {showAll && (
        <ListItem
          className="treeItem"
          primaryText={allName}
          style={selectedId === "all" ? styles.selectedItem : null}
          innerDivStyle={styles.innerItem}
          leftIcon={<FontIcon className="material-icons">folder</FontIcon>}
          onClick={handleClickAll}
        />
      )}

      {rows}

      {showManage && (
        <Link to="/products/categories" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.productCategories_titleEditMany}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          />
        </Link>
      )}

      {showImport && (
        <Link to="/products/import" style={{ textDecoration: "none" }}>
          <ListItem
            className="treeItem"
            primaryText={messages.drawer_importing}
            innerDivStyle={styles.innerItem}
            leftIcon={<FontIcon className="material-icons">get_app</FontIcon>}
            onClick={handleClickImport}
          />
        </Link>
      )}
    </List>
  )
}

export default Categories
