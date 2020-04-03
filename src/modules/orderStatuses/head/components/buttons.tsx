import React, { useState, Fragment } from "react";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

const Buttons = () => {
  const [openDelete, setOpenDelete] = useState(false);

  const showDelete = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteStatus = () => {
    this.setState({ openDelete: false });
    this.props.onDelete(this.props.selected.id);
  };

  const { selected, onDelete, onCreate } = this.props;
  const statusName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft";

  return (
    <span>
      {selected && (
        <Fragment>
          <IconButton
            touch
            tooltip={messages.actions_delete}
            tooltipPosition="bottom-left"
            onClick={this.showDelete}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <DeleteConfirmation />
        </Fragment>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addOrderStatus}
        onClick={onCreate}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </span>
  );
};

export default Buttons;
