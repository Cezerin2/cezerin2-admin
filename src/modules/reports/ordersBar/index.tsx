import moment from "moment"
import React, { useEffect, useState } from "react"
import api from "../../../lib/api"
import messages from "../../../lib/text"
import BarChart from "./barChart"
import * as utils from "./utils"

const OrdersBar = () => {
  const [ordersData, setOdersData] = useState({})
  const [salesData, setSalesData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    const filter = {
      draft: false,
      cancelled: false,
      date_placed_min: moment()
        .subtract(1, "months")
        .hour(0)
        .minute(0)
        .second(0)
        .toISOString(),
    }

    const { json } = api.orders.list(filter)
    try {
      const reportData = utils.getReportDataFromOrders(json)
      const ordersData = utils.getOrdersDataFromReportData(reportData)
      const salesData = utils.getSalesDataFromReportData(reportData)
      setOdersData(ordersData)
      setSalesData(salesData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <BarChart
        data={ordersData}
        legendDisplay
        title={messages.drawer_orders}
      />
      <BarChart
        data={salesData}
        legendDisplay={false}
        title={messages.salesReport}
      />
    </>
  )
}

export default OrdersBar
