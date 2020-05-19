import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import api from "../lib/api"
import messages from "../lib/text"

export const Description = {
  key: "google-analytics",
  name: "Google Analytics",
  coverUrl: "/assets/images/apps/google_analytics.png",
  description: `Google Analytics gives you the digital analytics tools you need to analyze data from all touchpoints in one place, for a deeper understanding of the customer experience.
  <p>This App logs page views and Enhanced ecommerce events:</p>
  <ol>
    <li>Page view</li>
    <li>Product view</li>
    <li>Search</li>
    <li>Add to cart</li>
    <li>Remove from cart</li>
    <li>Begin checkout</li>
    <li>Set shipping method</li>
    <li>Set payment method</li>
    <li>Purchase</li>
  </ol>
  <p>This App will add gtag.js to your site. The Global Site Tag (gtag.js) provides a framework for streamlined web page tagging – giving you better control while making implementation easier. Using gtag.js lets you benefit from the latest tracking features and integrations as they become available.</p>`,
}

const GTAG_CODE = `<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>`

export const GAnalytics = () => {
  const [trackingID, setTrackingID] = useState("")

  const handleTrackingIdChange = event => {
    setTrackingID(event.target.value)
  }

  const fetchSettings = () => {
    api.apps.settings
      .retrieve("google-analytics")
      .then(({ status, json }) => {
        const appSettings = json
        if (appSettings) {
          setTrackingID(appSettings.GA_TRACKING_ID)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateSettings = () => {
    const gtag =
      trackingID && trackingID.length > 0
        ? GTAG_CODE.replace(/GA_TRACKING_ID/g, trackingID)
        : ""

    api.apps.settings.update("google-analytics", {
      GA_TRACKING_ID: trackingID,
    })
    api.theme.placeholders.update("google-analytics", {
      place: "head_start",
      value: gtag,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      <>
        Enter your Google Analytics Tracking ID to track page views and other
        events.
      </>

      <TextField
        type="text"
        value={trackingID}
        onChange={handleTrackingIdChange}
        floatingLabelText="Tracking ID"
        hintText="UA-XXXXXXXX-X"
      />

      <div style={{ textAlign: "right" }}>
        <Button color="primary" onClick={updateSettings}>
          {messages.save}
        </Button>
      </div>
    </>
  )
}
