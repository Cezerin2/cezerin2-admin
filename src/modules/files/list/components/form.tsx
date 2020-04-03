import React from "react";

import moment from "moment";
import messages from "../../../../lib/text";
import * as helper from "../../../../lib/helper";
import DeleteConfirmation from "../../../../modules/shared/deleteConfirmation";

import Paper from "material-ui/Paper";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FileUploader from "./fileUploader";
import "./style.css";
const { Fragment } = React;

const iconButtonElement = (
  <IconButton touch>
    <FontIcon color="rgb(189, 189, 189)" className="material-icons">
      more_vert
    </FontIcon>
  </IconButton>
);

const FileList = () => {
  return (
    <Fragment>
      <div className="head" row--no-gutter>
        <div className="col-xs-5">{messages.fileName}</div>
        <div className="col-xs-3">{messages.fileModified}</div>
        <div className="col-xs-2">{messages.fileSize}</div>
        <div className="col-xs-2" />
      </div>
      <Paper className="paper-box" zDepth={1}></Paper>
      <FileUploader />
    </Fragment>
  );
};

export default FileList;
