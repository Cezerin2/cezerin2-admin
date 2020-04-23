import React from "react"
import moment from "moment"

import messages from "../../../../lib/text"
import Paper from "material-ui/Paper"
import "./style.sass"

const ServiceLogs = ({ logs }) => {
  const list = logs.map((action, index) => {
    const date = moment(action.date)
    const dateFormated = date.fromNow()
    return (
      <div className="logsItem" key={index}>
        <div className="logMessage">{action.message}</div>
        <div className="logDate">{dateFormated}</div>
      </div>
    )
  })

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "0px 0px 0px 20px" }}>
        {messages.serviceLogs}
      </div>
      <Paper className="paper-box" zDepth={1}>
        <div className="logsBox">{list}</div>
      </Paper>
    </div>
  )
}

export default ServiceLogs
