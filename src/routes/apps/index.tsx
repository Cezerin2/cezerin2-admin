import { Router } from "@reach/router"
import React from "react"
import Account from "../../modules/apps/account"
import AppDetails from "../../modules/apps/appDetails"
import ServiceDetails from "../../modules/apps/serviceDetails"
import Services from "../../modules/apps/services"
import Login from "../../routes/apps/login"
import NotFound from "../../routes/notFound"

export default () => (
  <Router>
    <Services path="/apps" />
    <ServiceDetails path="/apps/service/:serviceId" />
    <AppDetails path="/apps/app/:appKey" />
    <Login path="/apps/login" />
    <Account path="/apps/account" />
    <NotFound />
  </Router>
)
