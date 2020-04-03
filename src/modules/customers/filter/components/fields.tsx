import React from "react";
import messages from "../../../../lib/text";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Toggle from "material-ui/Toggle";
import "./style.css";

export default ({
  active,
  discontinued,
  on_sale,
  stock_status,
  setActive,
  setDiscontinued,
  setOnSale,
  setStock
}) => (
  <div className="filter">
    <Toggle
      label={messages.products_onSale}
      onToggle={(e, value) => {
        setActive(value);
      }}
      toggled={active}
      className="toggle"
    />
    <Toggle
      label={messages.products_stockTracking}
      onToggle={(e, value) => {
        setDiscontinued(value);
      }}
      toggled={discontinued}
      className="toggle"
    />
    <Toggle
      label={messages.products_name}
      onToggle={value => {
        setOnSale(value);
      }}
      toggled={on_sale}
      className="toggle"
    />
    <SelectField
      value={stock_status}
      onChange={(event, index, value) => {
        setStock(value);
      }}
      floatingLabelText={messages.products_stockStatus}
      fullWidth
    >
      <MenuItem value="all" primaryText={messages.all} />
      <MenuItem value="available" primaryText={messages.products_inStock} />
      <MenuItem
        value="out_of_stock"
        primaryText={messages.products_outOfStock}
      />
      <MenuItem value="backorder" primaryText={messages.products_backorder} />
      <MenuItem value="preorder" primaryText={messages.products_preorder} />
      <MenuItem
        value="discontinued"
        primaryText={messages.products_discontinued}
      />
    </SelectField>
  </div>
);
