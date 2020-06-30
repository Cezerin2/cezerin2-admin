import { useEffect } from "react"
import { removeToken } from "../lib/auth"

const Logout = () => {
  useEffect(() => {
    removeToken()
  }, [])

  return null
}

export default Logout
