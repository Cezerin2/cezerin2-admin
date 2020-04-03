import React, { useState } from "react";
import messages from "../../../../../lib/text";
import DeleteConfirmation from "../../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
const { Fragment } = React;

const Buttons = () => {
  const [openDelete, setOpenDelete] = useState(false);

  const openDeletes = () => {
    setOpenDelete(true);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const deletePage = () => {
    setOpenDelete(false);
    this.props.onDelete(this.props.webhook.id);
  };

  const { webhook } = this.props;
  const webhookName =
    webhook && webhook.url && webhook.url.length > 0 ? webhook.url : "Draft";

  if (webhook) {
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
  }
  return null;
};

export default Buttons;
