import React, { useState } from "react";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false);

  const openDeletes = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const handleDelete = () => {
    this.closeDelete();
    this.props.onDelete();
  };

  const { product } = this.props;
  const productName =
    product && product.name && product.name.length > 0 ? product.name : "Draft";

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.deleteProduct}
        onClick={this.openDelete}
      >
        <FontIcon color="#fff" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
      {product && product.enabled && (
        <a href={product.url} target="_blank">
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.viewOnWebsite}
          >
            <FontIcon color="#fff" className="material-icons">
              open_in_new
            </FontIcon>
          </IconButton>
        </a>
      )}
      <DeleteConfirmation />
    </>
  );
};

export default Buttons;
