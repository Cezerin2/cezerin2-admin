import {
  blue700,
  cyan700,
  darkBlack,
  fullBlack,
  grey100,
  grey300,
  grey400,
  pinkA200,
  white,
} from "material-ui/styles/colors"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./app.css"
import "./flexboxgrid.min.css"
import Head from "./modules/head"
import Apps from "./routes/apps"
import Customers from "./routes/customers"
import CustomerDetails from "./routes/customers/edit"
import CustomerGroups from "./routes/customers/groups"
import Files from "./routes/files"
import Home from "./routes/home"
import Login from "./routes/login"
import Logout from "./routes/logout"
import NotFound from "./routes/notFound"
import Orders from "./routes/orders"
import OrderDetails from "./routes/orders/edit"
import OrderStatuses from "./routes/orders/statuses"
import Pages from "./routes/pages"
import PagesDetails from "./routes/pages/edit"
import Products from "./routes/products"
import ProductCategories from "./routes/products/categories"
import ProductDetails from "./routes/products/edit"
import ProductImport from "./routes/products/import"
import Settings from "./routes/settings"

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

export default () => (
  <Router>
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
            <Route path="/customers/groups" exact component={CustomerGroups} />
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
  </Router>
)
