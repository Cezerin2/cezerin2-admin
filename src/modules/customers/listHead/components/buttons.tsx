import React, { Fragment, useState } from "react";
import messages from "../../../../lib/text";
import GroupSelect from "../../../../modules/customerGroups/select";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Search from "./search";

const Buttons = () => {
  const [groupId, setGroupID] = useState(null);
  const [openSetGroup, setOpenSetGroup] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const showSetGroup = () => {
    setOpenSetGroup(true);
  };

  const showDelete = () => {
    setOpenDelete(true);
  };

  const closeSetGroup = () => {
    setOpenSetGroup(false);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const deleteCustomers = () => {
    setOpenDelete(false);
    this.props.onDelete();
  };

  const saveSetGroup = () => {
    setOpenSetGroup(false);
    this.props.onSetGroup(this.state.groupId);
  };

  const selectSetGroup = groupId => {
    setGroupID(groupId);
  };

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onEdit
  } = this.props;

  const actionsSetGroup = [
    <FlatButton
      label={messages.cancel}
      onClick={this.closeSetGroup}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.save}
      primary
      keyboardFocused
      onClick={this.saveSetGroup}
    />
  ];

  return (
    <Fragment>
      <Search value={search} setSearch={setSearch} />
      {selectedCount > 0 && (
        <Fragment>
          {selectedCount == 1 && (
            <IconButton
              touch={true}
              tooltipPosition="bottom-left"
              tooltip={messages.actions_delete}
              onClick={onEdit}
            >
              <FontIcon color="#fff" className="material-icons">
                edit
              </FontIcon>
            </IconButton>
          )}
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_delete}
            onClick={this.showDelete}
          >
            <FontIcon color="#fff" className="material-icons">
              delete
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.customers_setGroup}
            onClick={this.showSetGroup}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
          </IconButton>
          <DeleteConfirmation />
          <Dialog
            title={messages.customers_setGroup}
            actions={actionsSetGroup}
            modal={false}
            open={this.state.openSetGroup}
            onRequestClose={this.closeSetGroup}
            autoScrollBodyContent
          >
            <GroupSelect />
          </Dialog>
        </Fragment>
      )}
      {selectedCount < 1 && (
        <IconButton
          touch={true}
          tooltipPosition="bottom-left"
          tooltip={messages.customers_titleAdd}
          onClick={onCreate}
        >
          <FontIcon color="#fff" className="material-icons">
            add
          </FontIcon>
        </IconButton>
      )}
    </Fragment>
  );
};

export default Buttons;
