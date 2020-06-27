import { Button, Divider, List } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"
import Head from "./head"
import ProductsListItem from "./item"
import style from "./style.module.sass"

const ProductsList = (props: Readonly<{}>) => {
  const {
    items,
    selected,
    loadingItems,
    onSelect,
    onSelectAll,
    loadMore,
    settings,
    hasMore,
  } = props

  useEffect(() => {
    props.onLoad()
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
          <Button
            disabled={loadingItems || !hasMore}
            labelPosition="before"
            primary={false}
            icon={<Refresh className="material-icons" />}
            onClick={loadMore}
          >
            {messages.actions_loadMore}
          </Button>
        </div>
      </List>
    </div>
  )
}

export default ProductsList
