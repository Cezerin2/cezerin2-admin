import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import api from "../lib/api"
import messages from "../lib/text"

export const Description = {
  key: "jivosite",
  name: "JivoSite онлайн-консультант",
  coverUrl: "/assets/images/apps/jivosite.png",
  description: `JivoSite – чат для сайта и инструмент для общения с клиентами в социальных сетях, мессенджерах и мобильных приложениях. Зарабатывайте больше, не упуская ни одного обращения.`,
}

export const App = () => {
  const [code, setCode] = useState("")

  async function fetchSettings() {
    try {
      const appSettings = await api.apps.settings.retrieve("jivosite")
      if (appSettings) {
        setCode(appSettings.code)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateSettings = () => {
    api.apps.settings.update("jivosite", { code })
    api.theme.placeholders.update("jivosite", {
      place: "body_end",
      value: code,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      Введите код JivoSite
      <TextField
        type="text"
        multiline
        fullWidth
        rows={10}
        value={code}
        onChange={event => setCode(event.target.value)}
        label="Код чата JivoSite"
        helperText="<!-- BEGIN JIVOSITE CODE {literal} -->..."
      />
      <Button
        color="primary"
        onClick={updateSettings}
        style={{ textAlign: "right" }}
      >
        {messages.save}
      </Button>
    </>
  )
}
