import { toNumber } from "lodash"
import messages from "./text"

const LOGIN_PATH = "/apps/login"
const HOME_PATH = "/apps"

const getParameterByName = (name: string, url: string) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const validateCurrentToken = () => {
  if (window.location.pathname !== LOGIN_PATH) {
    if (!isCurrentTokenValid()) {
      window.location.replace(LOGIN_PATH)
    }
  }
}

export const checkTokenFromUrl = () => {
  if (window.location.pathname === LOGIN_PATH) {
    const token = getParameterByName("webstoretoken", "")
    if (token && token !== "") {
      const tokenData = parseJWT(token)

      if (tokenData) {
        const expirationDate = tokenData.exp * 1000
        if (expirationDate > Date.now()) {
          saveToken({ token, email: tokenData.email, expirationDate })
          window.location.replace(HOME_PATH)
        } else {
          alert(messages.tokenExpired)
        }
      } else {
        alert(messages.tokenInvalid)
      }
    } else if (isCurrentTokenValid()) {
      window.location.replace(HOME_PATH)
    }
  }
}

const parseJWT = (jwt: string) => {
  try {
    const payload = jwt.split(".")[1]
    const tokenData = JSON.parse(atob(payload))
    return tokenData
  } catch (e) {
    return null
  }
}

const saveToken = (data: {
  token: string
  email: string
  expirationDate: number
}) => {
  localStorage.setItem("webstore_token", data.token)
  localStorage.setItem("webstore_email", data.email)
  localStorage.setItem("webstore_exp", data.expirationDate.toString())
}

export const isCurrentTokenValid = () => {
  const expirationDate = localStorage.getItem("webstore_exp")
  return (
    localStorage.getItem("webstore_token") &&
    expirationDate &&
    toNumber(expirationDate) > Date.now()
  )
}
