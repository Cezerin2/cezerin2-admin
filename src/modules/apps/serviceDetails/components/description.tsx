import React from "react"

import messages from "../../../../lib/text"

import Paper from "material-ui/Paper"
import RaisedButton from "material-ui/RaisedButton"
import "./style.sass"

const ServiceDescription = ({
  service,
  loadingEnableDisable,
  enableService,
  disableService,
}) => {
  if (service) {
    return (
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Paper className="paper-box" zDepth={1}>
          <div className="innerBox">
            <div className="row">
              <div className="col-xs-4">
                <img
                  src={service.cover_url}
                  alt={service.name}
                  className="cover"
                />
              </div>
              <div className="col-xs-8">
                <h1 className="title">{service.name}</h1>
                <div className="developer">{service.developer.name}</div>
                {!service.enabled && (
                  <RaisedButton
                    label={messages.enable}
                    primary
                    disabled={loadingEnableDisable}
                    onClick={enableService}
                  />
                )}
                {service.enabled && (
                  <RaisedButton
                    label={messages.disable}
                    disabled={loadingEnableDisable}
                    onClick={disableService}
                  />
                )}
              </div>
            </div>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: service.description,
              }}
            />
          </div>
        </Paper>
      </div>
    )
  }
  return null
}

export default ServiceDescription
