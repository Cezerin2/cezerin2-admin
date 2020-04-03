import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

const Buttons = () => {
  openDelete: false;

  const openDelete = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteOrder = () => {
    this.closeDelete();
    this.props.onDelete();
  };

  const { customer } = this.props;
  const customerName =
    customer && customer.full_name && customer.full_name.length > 0
      ? customer.full_name
      : "Draft";

  return (
    <>
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.actions_delete}
        onClick={this.openDelete}
      >
        <FontIcon color="#fff" className="material-icons">
          delete
        </FontIcon>
      </IconButton>
      <DeleteConfirmation />
    </>
  );
};

export default Buttons;
