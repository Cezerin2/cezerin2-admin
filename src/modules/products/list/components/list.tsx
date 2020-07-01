import { Divider } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { List } from "material-ui/List"
import RaisedButton from "material-ui/RaisedButton"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"
import Head from "./head"
import ProductsListItem from "./item"
import style from "./style.css"

const ProductsList = (
  props: Readonly<{
    items
    selected
    loadingItems
    onSelect
    onSelectAll
    loadMore
    settings
    hasMore
    onLoad
  }>
) => {
  const {
    items,
    selected,
    loadingItems,
    onSelect,
    onSelectAll,
    loadMore,
    settings,
    hasMore,
    onLoad,
  } = props

  useEffect(() => {
    onLoad()
  }, [])

  const rows = items.map((item, index) => {
    const itemSelected = selected.includes(item.id)
    return (
      <ProductsListItem
        key={index}
        product={item}
        selected={itemSelected}
        onSelect={onSelect}
        settings={settings}
      />
    )
  })

  return (
    <div className="product-list">
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
            icon={<Refresh className="material-icons" />}
            onClick={loadMore}
          />
        </div>
      </List>
    </div>
  )
}

export default ProductsList
