import React from "react"
import Item from "./item"

const ServiceItem = ({
  service,
}: {
  service: {
    id: string
    cover_url: string
    name: string
    developer: { name: string }
    enabled: string
  }
}) => (
  <Item
    path={`/apps/service/${service.id}`}
    coverUrl={service.cover_url}
    title={service.name}
    developer={service.developer.name}
    enabled={service.enabled}
  />
)

export default ServiceItem
