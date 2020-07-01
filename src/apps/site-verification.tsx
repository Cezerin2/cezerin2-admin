import { Button, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import api from "../lib/api"
import messages from "../lib/text"

export const Description = {
  key: "site-verification",
  name: "Site Verification",
  coverUrl: "/assets/images/apps/site_verification.png",
  description: `Note that verifying your site with these services is not necessary in order for your site to be indexed by search engines. To use these advanced search engine tools and verify your site with a service, paste the HTML Tag code below.
  <p>Supported verification services:</p>
  <ol>
    <li><a target="_blank" href="https://www.google.com/webmasters/tools/" rel="external noopener noreferrer">Google Search Console</a></li>
    <li><a target="_blank" href="https://www.bing.com/webmaster/" rel="external noopener noreferrer">Bing Webmaster Center</a></li>
    <li><a target="_blank" href="https://pinterest.com/website/verify/" rel="external noopener noreferrer">Pinterest Site Verification</a></li>
    <li><a target="_blank" href="https://webmaster.yandex.com/sites/" rel="external noopener noreferrer">Yandex.Webmaster</a></li>
  </ol>`,
}

const GOOGLE_EXAMPLE = '<meta name="google-site-verification" content="1234" />'
const BING_EXAMPLE = '<meta name="msvalidate.01" content="1234" />'
const PINTEREST_EXAMPLE = '<meta name="p:domain_verify" content="1234" />'
const YANDEX_EXAMPLE = '<meta name="yandex-verification" content="1234" />'

export const SiteVerification = () => {
  const [google, setGoogle] = useState("")
  const [bing, setBing] = useState("")
  const [pinterest, setPinterest] = useState("")
  const [yandex, setYandex] = useState("")

  const fetchSettings = () => {
    api.apps.settings
      .retrieve("site-verification")
      .then(({ json }) => {
        const appSettings = json
        if (appSettings) {
          setGoogle(appSettings.google)
          setBing(appSettings.bing)
          setPinterest(appSettings.pinterest)
          setYandex(appSettings.yandex)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateSettings = () => {
    const metaTags = [google, bing, pinterest, yandex]
      .map(tag => (tag && tag.length > 0 ? tag : null))
      .filter(tag => tag !== null)
      .join("\n")

    api.apps.settings.update("site-verification", {
      google,
      bing,
      pinterest,
      yandex,
    })

    api.theme.placeholders.update("site-verification", {
      place: "head_start",
      value: metaTags,
    })
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <>
      <TextField
        type="text"
        value={google}
        onChange={event => setGoogle(event.target.value)}
        label="Google"
        fullWidth
        helperText={GOOGLE_EXAMPLE}
      />
      <TextField
        type="text"
        value={bing}
        onChange={event => setBing(event.target.value)}
        label="Bing"
        fullWidth
        helperText={BING_EXAMPLE}
      />
      <TextField
        type="text"
        value={pinterest}
        onChange={event => setPinterest(event.target.value)}
        label="Pinterest"
        fullWidth
        helperText={PINTEREST_EXAMPLE}
      />
      <TextField
        type="text"
        value={yandex}
        onChange={event => setYandex(event.target.value)}
        label="Yandex"
        fullWidth
        helperText={YANDEX_EXAMPLE}
      />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button color="primary" onClick={updateSettings}>
          {messages.save}
        </Button>
      </div>
    </>
  )
}
