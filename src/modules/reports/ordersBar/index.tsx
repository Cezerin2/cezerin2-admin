import React, { useEffect } from "react";
import messages from "../../../lib/text";
import api from "../../../lib/api";
import moment from "moment";
import BarChart from "./barChart";
import * as utils from "./utils";

const OrdersBar = state => {
  useEffect(() => fetchData());

  const fetchData = () => {
    const filter = {
      draft: false,
      cancelled: false,
      date_placed_min: moment()
        .subtract(1, "months")
        .hour(0)
        .minute(0)
        .second(0)
        .toISOString()
    };

    api.orders
      .list(filter)
      .then(({ json }) => {
        const reportData = utils.getReportDataFromOrders(json);
        const ordersData = utils.getOrdersDataFromReportData(reportData);
        const salesData = utils.getSalesDataFromReportData(reportData);
        this.setState({ ordersData, salesData });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { ordersData, salesData } = state;
  return (
    <div>
      <BarChart
        subTitle="Empty"
        data={ordersData}
        legendDisplay
        title={messages.drawer_orders}
      />
      <BarChart
        subTitle="Empty"
        data={salesData}
        legendDisplay={false}
        title={messages.salesReport}
      />
    </div>
  );
};

export default OrdersBar;
