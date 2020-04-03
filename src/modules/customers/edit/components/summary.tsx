import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import messages from "../../../../lib/text";
import * as helper from "../../../../lib/helper";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import Dialog from "material-ui/Dialog";
import SummaryForm from "./summaryForm.js";
import "./style.css";

const CustomerSummary = () => {
  openSummaryEdit: false;

  const showSummaryEdit = () => {
    this.setState({ openSummaryEdit: true });
  };

  const hideSummaryEdit = () => {
    this.setState({ openSummaryEdit: false });
  };

  const saveSummaryEdit = customer => {
    this.props.onCustomerSummaryUpdate(customer);
    this.hideSummaryEdit();
  };

  const { customer, settings } = this.props;
  const totalSpent = helper.formatCurrency(customer.total_spent, settings);

  return (
    <Paper className="paper-box" zDepth={1}>
      <div className="innerBox">
        <div
          className="customerName"
          style={{ paddingBottom: 26, paddingTop: 0 }}
        >
          {customer.full_name}
          <div>
            <small>{customer.group_name}</small>
          </div>
        </div>

        <div className="summaryRow row">
          <div className="col-xs-5">
            <span>{messages.email}</span>
          </div>
          <div className="col-xs-7">
            <a href={`MailTo:${customer.email}`} className="link">
              {customer.email}
            </a>
          </div>
        </div>

        <div className="summaryRow row">
          <div className="col-xs-5">
            <span>{messages.mobile}</span>
          </div>
          <div className="col-xs-7">{customer.mobile}</div>
        </div>

        <div className="summaryRow row">
          <div className="col-xs-5">
            <span>{messages.customers_totalSpent}</span>
          </div>
          <div className="col-xs-7">{totalSpent}</div>
        </div>

        <div className="summaryRow row">
          <div className="col-xs-5">
            <span>{messages.note}</span>
          </div>
          <div className="col-xs-7">{customer.note}</div>
        </div>

        <div style={{ marginTop: 20 }}>
          <RaisedButton
            label="Edit"
            style={{ marginRight: 15 }}
            onClick={this.showSummaryEdit}
          />
        </div>

        <Dialog
          title={messages.customers_titleEdit}
          modal={false}
          open={this.state.openSummaryEdit}
          onRequestClose={this.hideSummaryEdit}
          contentStyle={{ width: 600 }}
        >
          <SummaryForm
            initialValues={customer}
            onSubmit={this.saveSummaryEdit}
          />
        </Dialog>
      </div>
    </Paper>
  );
};

export default CustomerSummary;
