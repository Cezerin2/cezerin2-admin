import CezerinClient from "cezerin2-client"
import settings from "./settings"

let api = { apps: { settings: { retrieve: Function, update: Function } } }
const dashboardToken = localStorage.getItem("dashboard_token")
const webstoreToken = localStorage.getItem("webstore_token")

const DEVELOPER_MODE = settings.developerMode === true

if (dashboardToken || DEVELOPER_MODE === true) {
  api = new CezerinClient({
    apiBaseUrl: settings.apiBaseUrl || "/api/v1",
    apiToken: dashboardToken,
    webstoreToken,
  })
}

export default api
