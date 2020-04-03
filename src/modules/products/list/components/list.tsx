import React, { useEffect } from "react";
import { List } from "material-ui/List";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import messages from "../../../../lib/text";
import ProductsListItem from "./item";
import Head from "./head";
import "./style.css";

const ProductsList = props => {
  useEffect(() => props.onLoad());
  const {
    items,
    selected,
    loadingItems,
    onSelect,
    onSelectAll,
    loadMore,
    settings,
    hasMore
  } = props;

  const rows = items.map((item, index) => {
    const itemSelected = selected.includes(item.id);
    return (
      <ProductsListItem
        key={index}
        product={item}
        selected={itemSelected}
        onSelect={onSelect}
        settings={settings}
      />
    );
  });

  return (
    <div className="product-list">
      <List>
        <Head onSelectAll={onSelectAll} />
        <Divider />
        {rows}
        <div className="more">
          <RaisedButton
            disabled={loadingItems || !hasMore}
            label={messages.actions_loadMore}
            primary={false}
            icon={<FontIcon className="material-icons">refresh</FontIcon>}
            onClick={loadMore}
          />
        </div>
      </List>
    </div>
  );
};

export default ProductsList;
