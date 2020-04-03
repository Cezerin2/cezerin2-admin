import React from "react";

import messages from "../../../lib/text";

import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import "./style.css";

const AppDescription = ({
  name,
  description,
  coverUrl,
  developer,
  enabled
}) => (
  <div style={{ maxWidth: 720, width: "100%" }}>
    <Paper className="paper-box" zDepth={1}>
      <div className="innerBox">
        <div className="row">
          <div className="col-xs-4">
            <img src={coverUrl} alt={name} className="cover" />
          </div>
          <div className="col-xs-8">
            <h1 className="title">{name}</h1>
            <div className="developer">{developer}</div>
            {/* {!enabled &&
              <RaisedButton label={messages.enable} primary={true} disabled={loadingEnableDisable} onClick={enableService} />
            }
            {enabled &&
              <RaisedButton label={messages.disable} disabled={loadingEnableDisable} onClick={disableService} />
            } */}
          </div>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </Paper>
  </div>
);

export default AppDescription;
