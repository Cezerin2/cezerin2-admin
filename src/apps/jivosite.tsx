import React, { useState, useEffect, Fragment } from "react";
import messages from "../lib/text";
import api from "../lib/api";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export const Description = {
  key: "jivosite",
  name: "JivoSite онлайн-консультант",
  coverUrl: "/assets/images/apps/jivosite.png",
  description: `JivoSite – чат для сайта и инструмент для общения с клиентами в социальных сетях, мессенджерах и мобильных приложениях. Зарабатывайте больше, не упуская ни одного обращения.`
};

export const App = () => {
  const [code, setCode] = useState("");

  const handleChange = event => {
    this.setState({
      code: event.target.value
    });
  };

  const fetchSettings = () => {
    api.apps.settings
      .retrieve("jivosite")
      .then(({ status, json }) => {
        const appSettings = json;
        if (appSettings) {
          this.setState({ code: appSettings.code });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateSettings = () => {
    const { code } = this.state;

    api.apps.settings.update("jivosite", { code });
    api.theme.placeholders.update("jivosite", {
      place: "body_end",
      value: code
    });
  };

  useEffect(() => fetchSettings());

  return (
    <>
      <p>Введите код JivoSite</p>
      <TextField
        type="text"
        multiLine
        fullWidth
        rows={10}
        value={this.state.code}
        onChange={this.handleChange}
        floatingLabelText="Код чата JivoSite"
        hintText="<!-- BEGIN JIVOSITE CODE {literal} -->..."
      />
      <div style={{ textAlign: "right" }}>
        <RaisedButton
          label={messages.save}
          primary
          disabled={false}
          onClick={this.updateSettings}
        />
      </div>
    </>
  );
};
