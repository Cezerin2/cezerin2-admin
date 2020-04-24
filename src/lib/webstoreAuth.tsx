import messages from "./text"
import { url } from "inspector"

const LOGIN_PATH = "/apps/login"
const HOME_PATH = "/apps"
const winLoc = window.location

const getParameterByName = (name, url) => {
  if (!url) url = winLoc.href
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const validateCurrentToken = () => {
  if (winLoc.pathname !== LOGIN_PATH) {
    if (!isCurrentTokenValid()) {
      winLoc.replace(LOGIN_PATH)
    }
  }
}

export const checkTokenFromUrl = () => {
  if (winLoc.pathname === LOGIN_PATH) {
    const token = getParameterByName("webstoretoken", url)
    if (token && token !== "") {
      const tokenData = parseJWT(token)

      if (tokenData) {
        const expiration_date = tokenData.exp * 1000
        if (expiration_date > Date.now()) {
          saveToken({
            token,
            email: tokenData.email,
            expiration_date,
          })
          winLoc.replace(HOME_PATH)
        } else {
          alert(messages.tokenExpired)
        }
      } else {
        alert(messages.tokenInvalid)
      }
    } else if (isCurrentTokenValid()) {
      winLoc.replace(HOME_PATH)
    }
  }
}

const parseJWT = jwt => {
  try {
    const payload = jwt.split(".")[1]
    const tokenData = JSON.parse(atob(payload))
    return tokenData
  } catch (e) {
    return null
  }
}

const saveToken = data => {
  localStorage.setItem("webstore_token", data.token)
  localStorage.setItem("webstore_email", data.email)
  localStorage.setItem("webstore_exp", data.expiration_date)
}

export const isCurrentTokenValid = () => {
  const expiration_date = localStorage.getItem("webstore_exp")
  return (
    localStorage.getItem("webstore_token") &&
    expiration_date &&
    parseInt(expiration_date) > Date.now()
  )
}
