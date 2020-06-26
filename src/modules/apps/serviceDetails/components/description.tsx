import { Button, Paper } from "@material-ui/core"
import React from "react"
import messages from "../../../../lib/text"
import style from "./style.module.sass"

const ServiceDescription = (
  props: Readonly<{
    service: any
    loadingEnableDisable: Function
    enableService: Function
    disableService: Function
  }>
) => {
  const { service, loadingEnableDisable, enableService, disableService } = props

  if (service) {
    return (
      <div style={{ maxWidth: 720, width: "100%" }}>
        <Paper className="paper-box" elevation={1}>
          <div className={style.innerBox}>
            <div className="row">
              <div className="col-xs-4">
                <img
                  src={service.cover_url}
                  alt={service.name}
                  className={style.cover}
                />
              </div>
              <div className="col-xs-8">
                <h1 className={style.title}>{service.name}</h1>
                <div className={style.developer}>{service.developer.name}</div>
                {!service.enabled && (
                  <Button
                    color="primary"
                    disabled={loadingEnableDisable}
                    onClick={enableService}
                  >
                    {messages.enable}
                  </Button>
                )}
                {service.enabled && (
                  <Button
                    disabled={loadingEnableDisable}
                    onClick={disableService}
                  >
                    {messages.disable}
                  </Button>
                )}
              </div>
            </div>
            <div
              className={style.description}
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          </div>
        </Paper>
      </div>
    )
  }
  return null
}

export default ServiceDescription
