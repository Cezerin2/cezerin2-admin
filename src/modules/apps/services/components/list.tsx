import { Button } from "@material-ui/core"
import { Link } from "@reach/router"
import React, { useEffect } from "react"
import apps from "../../../../apps"
import messages from "../../../../lib/text"
import AppItem from "./appItem"
import ServiceItem from "./serviceItem"

const ServicesList = (props: any) => {
  useEffect(() => {
    props.fetchData()
  }, [])

  const { services, webstoreAuthorized } = props

  let serviceItems = null
  if (services && services.data) {
    serviceItems = services.data.map((service, index) => (
      <ServiceItem key={index} service={service} />
    ))
  }

  const appItems = apps.map((app, index) => (
    <AppItem key={index} app={app.Description} />
  ))

  return (
    <div
      className="row row--no-gutter scroll col-full-height"
      style={{ padding: 20, alignContent: "flex-start" }}
    >
      {appItems}
      {!webstoreAuthorized && (
        <div
          style={{
            width: "100%",
            marginTop: 30,
            color: "rgba(0, 0, 0, 0.52)",
          }}
        >
          {messages.loadFromWebstore}
          &nbsp;&nbsp;
          <Link to="/apps/login">
            <Button>{messages.loginTitle}</Button>
          </Link>
        </div>
      )}
      {serviceItems}
    </div>
  )
}

export default ServicesList
