import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import messages from "../../../../lib/text";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";

const Buttons = () => {
  const [openDelete, setOpenDelete] = useState(false);

  const openDeletes = () => {
    setOpenDelete(true);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const deletePage = () => {
    this.setState({ openDelete: false });
    this.props.onDelete(this.props.page.id);
  };

  const { page } = this.props;
  const pageName =
    page && page.meta_title && page.meta_title.length > 0
      ? page.meta_title
      : "Draft";

  if (page && !page.is_system) {
    return (
      <Fragment>
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
        {page.enabled && (
          <a href={page.url} target="_blank">
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
      </Fragment>
    );
  }
  return null;
};

export default Buttons;
