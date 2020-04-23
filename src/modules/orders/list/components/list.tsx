import React, { useEffect } from "react"
import { List } from "material-ui/List"
import Divider from "material-ui/Divider"
import RaisedButton from "material-ui/RaisedButton"
import FontIcon from "material-ui/FontIcon"
import messages from "../../../../lib/text"
import OrdersListItem from "./item"
import Head from "./head"
import "./style.sass"

const OrdersList = props => {
  useEffect(() => props.onLoad(), [])
  const {
    items,
    selected,
    loadingItems,
    hasMore,
    onSelect,
    onSelectAll,
    loadMore,
    settings,
  } = props
  const rows = items.map((item, index) => (
    <OrdersListItem
      key={index}
      order={item}
      selected={selected}
      onSelect={onSelect}
      settings={settings}
    />
  ))

  return (
    <List>
      <Head onSelectAll={onSelectAll} />
      <Divider />
      {rows}
      <div className="more">
        <RaisedButton
          disabled={loadingItems || !hasMore}
          label={messages.actions_loadMore}
          labelPosition="before"
          primary={false}
          icon={<FontIcon className="material-icons">refresh</FontIcon>}
          onClick={loadMore}
        />
      </div>
    </List>
  )
}

export default OrdersList
