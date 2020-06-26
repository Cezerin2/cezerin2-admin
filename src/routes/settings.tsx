import { Link, Router } from "@reach/router"
import FontIcon from "material-ui/FontIcon"
import { List, ListItem } from "material-ui/List"
import React from "react"
import messages from "../lib/text"
import Checkout from "../modules/settings/checkout"
import CheckoutFields from "../modules/settings/checkoutFields"
import Email from "../modules/settings/email"
import EmailTemplate from "../modules/settings/emailTemplates"
import General from "../modules/settings/general"
import GeneralLogo from "../modules/settings/generalLogo"
import GoogleSpredsheet from "../modules/settings/googlespreadsheet"
import Import from "../modules/settings/import"
import Payments from "../modules/settings/payments"
import PaymentsEdit from "../modules/settings/paymentsEdit"
import RedirectsEdit from "../modules/settings/redirects/edit"
import Redirects from "../modules/settings/redirects/list"
import Shipping from "../modules/settings/shipping"
import ShippingEdit from "../modules/settings/shippingEdit"
import Smtp from "../modules/settings/smtp"
import Theme from "../modules/settings/theme"
import TokensEdit from "../modules/settings/tokens/edit"
import Tokens from "../modules/settings/tokens/list"
import WebhooksEdit from "../modules/settings/webhooks/edit"
import Webhooks from "../modules/settings/webhooks/list"

const styles = {
  link: {
    color: "inherit",
    textDecoration: "none",
    fontWeight: "inherit",
    display: "block",
  },
  linkActive: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
}

const SettingsMenu = () => (
  <List>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings"
      exact
    >
      <ListItem
        primaryText={messages.settings_general}
        leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/shipping"
    >
      <ListItem
        primaryText={messages.settings_shipping}
        leftIcon={
          <FontIcon className="material-icons">local_shipping</FontIcon>
        }
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/payments"
    >
      <ListItem
        primaryText={messages.settings_payments}
        leftIcon={<FontIcon className="material-icons">payment</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/theme"
    >
      <ListItem
        primaryText={messages.settings_theme}
        leftIcon={<FontIcon className="material-icons">palette</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/checkout"
    >
      <ListItem
        primaryText={messages.settings_checkout}
        leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/email"
    >
      <ListItem
        primaryText={messages.settings_emails}
        leftIcon={<FontIcon className="material-icons">email</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/import"
      exact={true}
    >
      <ListItem
        primaryText={messages.drawer_importing}
        leftIcon={<FontIcon className="material-icons">get_app</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/redirects"
    >
      <ListItem
        primaryText={messages.redirects}
        leftIcon={<FontIcon className="material-icons">swap_calls</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/webhooks"
    >
      <ListItem
        primaryText={messages.webhooks}
        leftIcon={<FontIcon className="material-icons">http</FontIcon>}
      />
    </Link>
    <Link
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/tokens"
    >
      <ListItem
        primaryText={messages.settings_tokens}
        leftIcon={<FontIcon className="material-icons">vpn_key</FontIcon>}
      />
    </Link>
    {/* <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/taxes"><ListItem primaryText={messages.settings_taxes} leftIcon={<FontIcon className="material-icons">attach_money</FontIcon>}/></NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/security"><ListItem primaryText={messages.settings_security} leftIcon={<FontIcon className="material-icons">security</FontIcon>}/></NavLink> */}
  </List>
)

const Settings = () => (
  <div className="row row--no-gutter col-full-height">
    <div className="col-xs-12 col-sm-4 col-md-3 col--no-gutter scroll col-full-height">
      <SettingsMenu />
    </div>
    <div className="col-xs-12 col-sm-8 col-md-9 col--no-gutter scroll col-full-height">
      <Router>
        <General path="/settings" />
        <GeneralLogo path="/settings/general/logo" />
        <Theme path="/settings/theme" />
        <Shipping path="/settings/shipping" />
        <ShippingEdit path="/settings/shipping/add" />
        <ShippingEdit path="/settings/shipping/:methodId" />
        <Payments path="/settings/payments" />
        <PaymentsEdit path="/settings/payments/add" />
        <PaymentsEdit path="/settings/payments/:methodId" />
        <Tokens path="/settings/tokens" />
        <TokensEdit path="/settings/tokens/add" />
        <TokensEdit path="/settings/tokens/:tokenId" />
        <Email path="/settings/email" />
        <Smtp path="/settings/email/smtp" />
        <EmailTemplate path="/settings/email/templates/:templateName" />
        <Import path="/settings/import" />
        <GoogleSpredsheet path="/settings/import/googlespreadsheet" />
        <Checkout path="/settings/checkout" />
        <CheckoutFields path="/settings/checkout/fields/:fieldName" />
        <Redirects path="/settings/redirects" />
        <RedirectsEdit path="/settings/redirects/add" />
        <RedirectsEdit path="/settings/redirects/:redirectId" />
        <Webhooks path="/settings/webhooks" />
        <WebhooksEdit path="/settings/webhooks/add" />
        <WebhooksEdit path="/settings/webhooks/:webhookId" />
      </Router>
    </div>
  </div>
)

export default Settings
