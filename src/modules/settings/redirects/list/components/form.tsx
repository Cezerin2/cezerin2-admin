import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import messages from "../../../../../lib/text";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import { List, ListItem } from "material-ui/List";

const RedirectItem = ({ redirect }) => (
  <div>
    <Divider />
    <Link
      to={`/settings/redirects/${redirect.id}`}
      style={{ textDecoration: "none" }}
    >
      <ListItem
        rightIcon={
          <FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
        }
        primaryText={
          <div className="row">
            <div className="col-xs-4">{redirect.from}</div>
            <div className="col-xs-4">{redirect.to}</div>
            <div className="col-xs-4" style={{ color: "rgba(0, 0, 0, 0.4)" }}>
              301
            </div>
          </div>
        }
      />
    </Link>
  </div>
);

const RedirectsList = props => {
  useEffect(() => props.onLoad());
  const { redirects } = this.props;
  const listItems = redirects.map((redirect, index) => (
    <RedirectItem key={index} redirect={redirect} />
  ));

  return (
    <div>
      <div style={{ margin: 20, color: "rgba(0, 0, 0, 0.52)" }}>
        {messages.redirectsAbout}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div style={{ width: "100%" }}>
          <List style={{ padding: 0 }}>{listItems}</List>
        </div>
      </Paper>
    </div>
  );
};

export default RedirectsList;
