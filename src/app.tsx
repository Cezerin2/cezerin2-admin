import { green, purple } from "@material-ui/core/colors"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { Router } from "@reach/router"
import React from "react"
import "./App.sass"
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

// const muiTheme = getMuiTheme({
//   fontFamily: "Roboto, sans-serif",
//   palette: {
//     primary1Color: blue[700],
//     primary2Color: cyan[700],
//     primary3Color: grey[400],
//     accent1Color: pink[200],
//     accent2Color: grey100,
//     accent3Color: blue[700],
//     textColor: darkBlack,
//     alternateTextColor: white,
//     canvasColor: white,
//     borderColor: grey[300],
//     pickerHeaderColor: blue[700],
//     shadowColor: fullBlack,
//   },
//   appBar: {},
// })

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
})

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <div id="container">
        <div id="headContainer">
          <Head />
        </div>
        <div id="bodyContainer">
          <Home path="/" />
          <Login path="/login" />
          <Logout path="/logout" />
          <Products path="/products" />
          <ProductImport path="/products/import" />
          <ProductCategories path="/products/categories" />
          <Orders path="/orders" />
          <OrderStatuses path="/orders/statuses" />
          <OrderDetails path="/order/:orderId" />
          <Customers path="/customers" />
          <CustomerGroups path="/customers/groups" />
          <CustomerDetails path="/customer/:customerId" />
          <ProductDetails path="/product/:productId" />
          <Pages path="/pages" />
          <PagesDetails path="/pages/add" />
          <PagesDetails path="/pages/:pageId" />
          <Settings path="/settings" />
          <Apps path="/apps" />
          <Files path="/files" />
          <NotFound />
        </div>
      </div>
    </ThemeProvider>
  </Router>
)

export default App
