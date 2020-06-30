import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import api from "../lib/api"
import messages from "../lib/text"

export const Description = {
  key: "facebook-sdk",
  name: "Facebook SDK",
  coverUrl: "/assets/images/apps/facebook.png",
  description: `The Facebook SDK for JavaScript provides a rich set of client-side functionality that:
  <ol>
    <li>Enables you to use the Like Button and other Social Plugins on your site.</li>
    <li>Enables you to use Facebook Login to lower the barrier for people to sign up on your site.</li>
    <li>Makes it easy to call into Facebook's Graph API.</li>
    <li>Launch Dialogs that let people perform various actions like sharing stories.</li>
    <li>Facilitates communication when you're building a game or an app tab on Facebook.</li>
  </ol>
  <p>The Facebook SDK for JavaScript doesn't have any standalone files that need to be downloaded or installed, instead you simply need to include a short piece of regular JavaScript in your HTML that will asynchronously load the SDK into your pages. The async load means that it does not block loading other elements of your page.</p>`,
}

const FACEBOOK_CODE = `<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId            : 'YOUR_APP_ID',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.11'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/YOUR_LOCALE/sdk/xfbml.customerchat.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>`

export const App = () => {
  const [appID, setAppID] = useState("")
  const [locale, setLocale] = useState("en_US")

  const fetchSettings = () => {
    const { json } = api.apps.settings.retrieve("facebook-sdk")
    try {
      const appSettings = json
      if (appSettings) {
        setAppID(appSettings.appID)
        setLocale(appSettings.locale)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateSettings = () => {
    const htmlCode =
      appID && appID.length > 0
        ? FACEBOOK_CODE.replace(/YOUR_APP_ID/g, appID).replace(
            /YOUR_LOCALE/g,
            locale
          )
        : ""

    api.apps.settings.update("facebook-sdk", { appID, locale })
    api.theme.placeholders.update("facebook-sdk", {
      place: "body_start",
      value: htmlCode,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      <>You can find App ID using the Facebook App Dashboard.</>

      <TextField
        type="text"
        fullWidth
        value={appID}
        onChange={event => setAppID(event.target.value)}
        label="App ID"
      />

      <TextField
        type="text"
        fullWidth
        value={locale}
        onChange={event => setLocale(event.target.value)}
        label="Locale"
        helperText="en_US"
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
