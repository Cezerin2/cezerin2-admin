import RaisedButton from "@material-ui/core/RaisedButton"
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

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setCode(event.target.value)
  }

  const fetchSettings = () => {
    api.apps.settings
      .retrieve("jivosite")
      .then(({ json }) => {
        const appSettings = json
        if (appSettings) {
          setCode(appSettings.code)
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
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
      <>Введите код JivoSite</>

      <TextField
        type="text"
        multiLine
        fullWidth
        rows={10}
        value={code}
        onChange={handleChange}
        floatingLabelText="Код чата JivoSite"
        hintText="<!-- BEGIN JIVOSITE CODE {literal} -->..."
      />

      <div style={{ textAlign: "right" }}>
        <RaisedButton
          label={messages.save}
          primary
          disabled={false}
          onClick={updateSettings}
        />
      </div>
    </>
  )
}
