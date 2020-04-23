import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import Head from "./modules/head"
import Login from "./routes/login"
import Logout from "./routes/logout"
import Home from "./routes/home"
import NotFound from "./routes/notFound"
import Products from "./routes/products"
import ProductImport from "./routes/products/import"
import ProductDetails from "./routes/products/edit"
import ProductCategories from "./routes/products/categories"
import Customers from "./routes/customers"
import CustomerDetails from "./routes/customers/edit"
import CustomerGroups from "./routes/customers/groups"
import Orders from "./routes/orders"
import OrderDetails from "./routes/orders/edit"
import OrderStatuses from "./routes/orders/statuses"
import Pages from "./routes/pages"
import PagesDetails from "./routes/pages/edit"
import Settings from "./routes/settings"
import Apps from "./routes/apps"
import Files from "./routes/files"

function Routes() {
  return (
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
    </Router>
  )
}

export default Routes
