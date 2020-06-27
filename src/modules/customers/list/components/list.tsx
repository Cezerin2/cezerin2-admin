import { Button, Divider, List } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import React, { useEffect } from "react"
import messages from "../../../../lib/text"
import Head from "./head"
import CustomersListItem from "./item"
import style from "./style.module.sass"

const CustomersList = (props: Readonly<{}>) => {
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
    <CustomersListItem
      key={index}
      customer={item}
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
    </>
  )
}

export default CustomersList
