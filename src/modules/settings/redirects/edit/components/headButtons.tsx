import React, { useState } from "react";
import messages from "../../../../../lib/text";
import DeleteConfirmation from "../../../../../modules/shared/deleteConfirmation";
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

  const deletePage = () => {
    this.setState({ openDelete: false });
    this.props.onDelete(this.props.redirect.id);
  };

  const { redirect } = this.props;
  const redirectName =
    redirect && redirect.from && redirect.from.length > 0
      ? redirect.from
      : "Draft";

  if (redirect) {
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
