import { Divider, List } from "@material-ui/core"
import FontIcon from "material-ui/FontIcon"
import RaisedButton from "material-ui/RaisedButton"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"
import Head from "./head"
import OrdersListItem from "./item"
import style from "./style.module.sass"

const OrdersList = props => {
  useEffect(() => {
    props.onLoad()
  }, [])

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
    <>
      <List>
        <Head onSelectAll={onSelectAll} />
        <Divider />
        {rows}
        <div className={style.more}>
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
    </>
  )
}

export default OrdersList
