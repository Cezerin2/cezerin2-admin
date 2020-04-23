import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Head from "./../modules/head"

import Login from "./login"
import Logout from "./logout"
import Home from "./home"
import NotFound from "./notFound"
import Products from "./products"
import ProductImport from "./products/import"
import ProductDetails from "./products/edit"
import ProductCategories from "./products/categories"
import Customers from "./customers"
import CustomerDetails from "./customers/edit"
import CustomerGroups from "./customers/groups"
import Orders from "./orders"
import OrderDetails from "./orders/edit"
import OrderStatuses from "./orders/statuses"
import Pages from "./pages"
import PagesDetails from "./pages/edit"
import Settings from "./settings"
import Apps from "./apps"
import Files from "./files"

import {
  blue700,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  white,
  darkBlack,
  fullBlack,
} from "material-ui/styles/colors"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"

const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary1Color: blue700,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: blue700,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: blue700,
    shadowColor: fullBlack,
  },
  appBar: {},
})

function Routes() {
  return (
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="container">
          <div id="headContainer">
            <Head />
          </div>
          <div id="bodyContainer">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/products" exact component={Products} />
              <Route path="/products/import" component={ProductImport} />
              <Route
                path="/products/categories"
                exact
                component={ProductCategories}
              />
              <Route path="/orders" exact component={Orders} />
              <Route path="/orders/statuses" exact component={OrderStatuses} />
              <Route path="/order/:orderId" exact component={OrderDetails} />
              <Route path="/customers" exact component={Customers} />
              <Route
                path="/customers/groups"
                exact
                component={CustomerGroups}
              />
              <Route
                path="/customer/:customerId"
                exact
                component={CustomerDetails}
              />
              <Route path="/product/:productId" component={ProductDetails} />
              <Route path="/pages" exact component={Pages} />
              <Route path="/pages/add" exact component={PagesDetails} />
              <Route path="/pages/:pageId" component={PagesDetails} />
              <Route path="/settings" component={Settings} />
              <Route path="/apps" component={Apps} />
              <Route path="/files" exact component={Files} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  )
}

export default Routes
