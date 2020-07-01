import { Dispatch } from "redux"
import { fetchOrders } from "../modules/orders/actions"
import { installReceive } from "../modules/settings/actions"
import settings from "./settings"
import messages from "./text"

const AUTO_RECONNECT_INTERVAL = 1000 // 1 seconds
const ORDER_CREATED = "order.created"
const THEME_INSTALLED = "theme.installed"
let store: {
  dispatch: Dispatch
}

export const connectToWebSocket = (reduxStore: { dispatch: Dispatch }) => {
  store = reduxStore
  connect()
}

const connect = () => {
  const wsUrl =
    settings.apiWebSocketUrl && settings.apiWebSocketUrl.length > 0
      ? settings.apiWebSocketUrl
      : getWebSocketUrlFromCurrentLocation()

  const token = localStorage.getItem("dashboard_token")
  const ws = new WebSocket(`${wsUrl}/ws/dashboard?token=${token}`)

  ws.onmessage = onMessage
  ws.onopen = onOpen
  ws.onclose = onClose
  ws.onerror = onError
}

const getWebSocketUrlFromCurrentLocation = () => {
  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  return `${wsProtocol}//${window.location.host}`
}

const onMessage = (event: { data: string }) => {
  try {
    const message = JSON.parse(event.data)
    eventHandler(message)
  } catch (error) {
    console.error(error)
  }
}

const onOpen = () => {
  if (settings.developerMode === true) {
    console.info("Connection established.")
  }
}

const onError = () => {
  console.error("Error happened")
}

const onClose = (event: { code: number }) => {
  if (event.code !== 1000) {
    if (settings.developerMode === true) {
      console.log(`WebSocket connection closed with code: ${event.code}.`)
    }
    // try to reconnect
    setTimeout(() => {
      connect()
    }, AUTO_RECONNECT_INTERVAL)
  }
}

const showNotification = (
  title: string,
  body: string,
  requireInteraction = false
) => {
  const msg = new Notification(title, {
    body,
    tag: "dashboard",
    requireInteraction,
  })

  msg.addEventListener("click", event => {
    event.target.parent.focus()
    event.target.close()
  })
}

const eventHandler = (
  props: Readonly<{
    event
    payload: {
      number: string
      shipping_address: { full_name: string; city: string }
    }
  }>
) => {
  const { event, payload } = props

  switch (event) {
    case THEME_INSTALLED:
      store.dispatch(installReceive())
      showNotification(messages.settings_theme, messages.themeInstalled)
      break
    case ORDER_CREATED:
      const order = payload
      store.dispatch(fetchOrders())
      showNotification(
        `${messages.order} #${order.number}`,
        `${order.shipping_address.full_name}, ${order.shipping_address.city}`,
        true
      )
      break
    default:
      break
  }
}
