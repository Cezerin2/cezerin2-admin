import React, { useState } from "react";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";

const Buttons = () => {
  const [openDelete, etOpenDelete] = useState(false);

  const showDelete = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteGroup = () => {
    this.setState({ openDelete: false });
    this.props.onDelete(this.props.selected.id);
  };

  const { selected, onDelete, onCreate } = this.props;
  const groupName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft";

  return (
    <span>
      {selected && (
        <>
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
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.customerGroups_titleAdd}
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
