import React, { useState } from "react";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import Search from "./search";

const Buttons = props => {
  const [openDelete, setOpenDelete] = useState(false);

  const openDeletes = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteOrders = () => {
    this.setState({ openDelete: false });
    this.props.onDelete();
  };

  const { search, setSearch, selectedCount, onDelete, onCreate } = this.props;

  return (
    <>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
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
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.orders_titleAdd}
        onClick={onCreate}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </>
  );
};

export default Buttons;
