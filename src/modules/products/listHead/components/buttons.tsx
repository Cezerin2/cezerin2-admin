import React, { Fragment, useState } from "react";
import messages from "../../../../lib/text";
import CategorySelect from "../../../../modules/productCategories/select";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Search from "./search";

function Buttons(props) {
  const [categoryIdMoveTo, sercategoryIDmoveTo] = useState(null);
  const [openMoveTo, setOpenMoveTo] = useState(false);

  const showMoveTo = () => {
    this.setState({ openMoveTo: true });
  };

  const openDelete = () => {
    this.setState({ openDelete: true });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteProduct = () => {
    this.setState({ openDelete: false });
    this.props.onDelete();
  };

  const closeMoveTo = () => {
    this.setState({ openMoveTo: false });
  };

  const saveMoveTo = () => {
    this.setState({ openMoveTo: false });
  };

  const selectMoveTo = categoryId => {
    this.setState({ categoryIdMoveTo: categoryId });
  };

  const {
    search,
    setSearch,
    selectedCount,
    onDelete,
    onCreate,
    onImportProducts
  } = props;

  const actionsMoveTo = [
    <FlatButton
      label={messages.cancel}
      onClick={this.closeMoveTo}
      style={{ marginRight: 10 }}
    />,
    <FlatButton
      label={messages.actions_moveHere}
      primary
      keyboardFocused
      onClick={this.saveMoveTo}
    />
  ];

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
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveTo}
            onClick={this.showMoveTo}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
          </IconButton>
          <DeleteConfirmation />
          <Dialog
            title={messages.actions_moveTo}
            actions={actionsMoveTo}
            modal={false}
            open={this.state.openMoveTo}
            onRequestClose={this.closeMoveTo}
            autoScrollBodyContent
          >
            <CategorySelect />
          </Dialog>
        </>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.addProduct}
        onClick={onCreate}
      >
        <FontIcon color="#fff" className="material-icons">
          add
        </FontIcon>
      </IconButton>
    </>
  );
}

export default Buttons;
