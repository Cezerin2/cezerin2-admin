import { Checkbox } from "@material-ui/core"
import { Folder, VisibilityOff } from "@material-ui/icons"
import { List, ListItem } from "material-ui/List"
import React from "react"

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

const Item = props => {
  const { item, opened, selectedIds, nestedItems, onCheck } = props

  const handleCheck = (event, isInputChecked) => {
    onCheck(item.id)
  }

  const isChecked =
    selectedIds && selectedIds.length > 0 && selectedIds.includes(item.id)
  // const style = isChecked ? styles.selectedItem : null;

  return (
    <ListItem
      className="treeItem"
      initiallyOpen={opened}
      innerDivStyle={styles.innerItem}
      primaryText={item.name}
      nestedItems={nestedItems}
      leftCheckbox={<Checkbox checked={isChecked} onCheck={handleCheck} />}
      nestedListStyle={styles.nestedListStyle}
    />
  )
}

const Categories = (props: Readonly<{}>) => {
  function getItem(selectedIds, allItems, item, opened) {
    const nestedItems = getChildren(selectedIds, allItems, item.id, opened)
    return (
      <Item
        key={item.id}
        item={item}
        opened={opened}
        selectedIds={selectedIds}
        nestedItems={nestedItems}
        onCheck={props.onCheck}
      />
    )
  }

  function getChildren(selectedIds, allItems, id, opened) {
    if (allItems && id) {
      return allItems
        .filter(item => item.parent_id === id)
        .map(item => getItem(selectedIds, allItems, item, opened))
    }
    return []
  }

  const { selectedIds, items, opened = false } = props

  const rows = items
    .filter(item => item.parent_id === null)
    .map(item => getItem(selectedIds, items, item, opened))

  return <List>{rows}</List>
}

export default Categories
