import React, { useState, Fragment } from "react";
import messages from "../../../../../lib/text";
import CategorySelect from "../../../../../modules/productCategories/select";
import FontIcon from "material-ui/FontIcon";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const ProductCategorySelect = () => {
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const opens = () => {
    setOpen(true);
  };

  const handleSelect = categoryId => {
    this.props.input.onChange(categoryId);
  };

  const selectedCategoryId = "value";
  const category = "category.find(item => item.id === selectedCategoryId);";
  const categoryName = category ? category : "";

  const dialogButtons = [
    <FlatButton
      label={messages.cancel}
      onClick={this.close}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.save}
      primary
      keyboardFocused
      onClick={this.close}
    />
  ];

  return (
    <>
      <Dialog
        title={messages.category}
        actions={dialogButtons}
        modal={false}
        open={open}
        onRequestClose={this.close}
        autoScrollBodyContent
      >
        <CategorySelect />
      </Dialog>
      <FlatButton
        label={categoryName}
        icon={
          <FontIcon color="#777" className="material-icons">
            create
          </FontIcon>
        }
      />
    </>
  );
};

export default ProductCategorySelect;
