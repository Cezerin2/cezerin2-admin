import React from "react";
import messages from "../../../../lib/text";
import CategorySelect from "../../../../modules/productCategories/select";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const Buttons = () => {
  categoryIdMoveTo: "root";
  openMoveTo: false;
  openDelete: false;

  const showMoveTo = () => {
    this.setState({ openMoveTo: true });
  };

  const showDelete = () => {
    this.setState({ openDelete: true });
  };

  const closeMoveTo = () => {
    this.setState({ openMoveTo: false });
  };

  const closeDelete = () => {
    this.setState({ openDelete: false });
  };

  const deleteCategory = () => {
    this.setState({ openDelete: false });
    this.props.onDelete(this.props.selected.id);
  };

  const saveMoveTo = () => {
    this.setState({ openMoveTo: false });
    this.props.onMoveTo(this.state.categoryIdMoveTo);
  };

  const selectMoveTo = categoryId => {
    this.setState({ categoryIdMoveTo: categoryId });
  };

  const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = this.props;
  const categoryName =
    selected && selected.name && selected.name.length > 0
      ? selected.name
      : "Draft";

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
    <span>
      {selected && (
        <div>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveUp}
            onClick={onMoveUp}
          >
            <FontIcon color="#fff" className="material-icons">
              arrow_upward
            </FontIcon>
          </IconButton>
          <IconButton
            touch
            tooltipPosition="bottom-left"
            tooltip={messages.actions_moveDown}
            onClick={onMoveDown}
          >
            <FontIcon color="#fff" className="material-icons">
              arrow_downward
            </FontIcon>
          </IconButton>
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
            tooltip={messages.actions_moveTo}
            onClick={this.showMoveTo}
          >
            <FontIcon color="#fff" className="material-icons">
              folder
            </FontIcon>
          </IconButton>
          <Dialog
            title={messages.actions_moveTo}
            actions={actionsMoveTo}
            modal={false}
            open={this.state.openMoveTo}
            onRequestClose={this.closeMoveTo}
            autoScrollBodyContent
          />
        </div>
      )}
      <IconButton
        touch
        tooltipPosition="bottom-left"
        tooltip={messages.productCategories_titleAdd}
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
