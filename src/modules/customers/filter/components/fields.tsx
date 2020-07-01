import { MenuItem, Select } from "@material-ui/core"
import Toggle from "material-ui/Toggle"
import React from "react"
import messages from "../../../../lib/text"
import style from "./style.css"
// import style from "./style.module.sass"

export default ({
  active,
  discontinued,
  on_sale,
  stock_status,
  setActive,
  setDiscontinued,
  setOnSale,
  setStock,
}) => (
  <div className={style.filter}>
    <Toggle
      label={messages.products_onlyEnabled}
      onToggle={(e, value) => {
        setActive(value)
      }}
      toggled={active}
      className={style.toggle}
    />
    <Toggle
      label={messages.products_onlyDiscontinued}
      onToggle={(e, value) => {
        setDiscontinued(value)
      }}
      toggled={discontinued}
      className={style.toggle}
    />
    <Toggle
      label={messages.products_onlyOnSale}
      onToggle={(e, value) => {
        setOnSale(value)
      }}
      toggled={on_sale}
      className={style.toggle}
    />
    <Select
      value={stock_status}
      onChange={(event, index, value) => {
        setStock(value)
      }}
      label={messages.products_stockStatus}
      fullWidth
    >
      <MenuItem value="all">{messages.all}</MenuItem>
      <MenuItem value="available">{messages.products_inStock}</MenuItem>
      <MenuItem value="out_of_stock">{messages.products_outOfStock}</MenuItem>
      <MenuItem value="backorder">{messages.products_backorder}</MenuItem>
      <MenuItem value="preorder">{messages.products_preorder} </MenuItem>
      <MenuItem value="discontinued">{messages.products_discontinued}</MenuItem>
    </Select>
  </div>
)
