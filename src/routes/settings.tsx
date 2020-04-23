import React from "react"
import { Switch, Route, NavLink } from "react-router-dom"
import messages from "../lib/text"

import { List, ListItem } from "material-ui/List"
import FontIcon from "material-ui/FontIcon"

import General from "../modules/settings/general"
import GeneralLogo from "../modules/settings/generalLogo"
import Theme from "../modules/settings/theme"
import Shipping from "../modules/settings/shipping"
import ShippingEdit from "../modules/settings/shippingEdit"
import Payments from "actionTypesmodules/settings/payments"
import PaymentsEdit from "../modules/settings/paymentsEdit"
import Tokens from "../modules/settings/tokens/list"
import TokensEdit from "../modules/settings/tokens/edit"
import Email from "../modules/settings/email"
import Import from "../modules/settings/import"
import GoogleSpredsheet from "../modules/settings/googlespreadsheet"
import Smtp from "../modules/settings/smtp"
import EmailTemplate from "../modules/settings/emailTemplates"
import Checkout from "../modules/settings/checkout"
import CheckoutFields from "../modules/settings/checkoutFields"
import Redirects from "../modules/settings/redirects/list"
import RedirectsEdit from "../modules/settings/redirects/edit"
import Webhooks from "../modules/settings/webhooks/list"
import WebhooksEdit from "../modules/settings/webhooks/edit"

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
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings"
      exact
    >
      <ListItem
        primaryText={messages.settings_general}
        leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
      />
    </NavLink>
    <NavLink
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
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/payments"
    >
      <ListItem
        primaryText={messages.settings_payments}
        leftIcon={<FontIcon className="material-icons">payment</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/theme"
    >
      <ListItem
        primaryText={messages.settings_theme}
        leftIcon={<FontIcon className="material-icons">palette</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/checkout"
    >
      <ListItem
        primaryText={messages.settings_checkout}
        leftIcon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/email"
    >
      <ListItem
        primaryText={messages.settings_emails}
        leftIcon={<FontIcon className="material-icons">email</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/import"
      exact={true}
    >
      <ListItem
        primaryText={messages.drawer_importing}
        leftIcon={<FontIcon className="material-icons">get_app</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/redirects"
    >
      <ListItem
        primaryText={messages.redirects}
        leftIcon={<FontIcon className="material-icons">swap_calls</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/webhooks"
    >
      <ListItem
        primaryText={messages.webhooks}
        leftIcon={<FontIcon className="material-icons">http</FontIcon>}
      />
    </NavLink>
    <NavLink
      style={styles.link}
      activeStyle={styles.linkActive}
      to="/settings/tokens"
    >
      <ListItem
        primaryText={messages.settings_tokens}
        leftIcon={<FontIcon className="material-icons">vpn_key</FontIcon>}
      />
    </NavLink>
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
      <Switch>
        <Route path="/settings" exact component={General} />
        <Route path="/settings/general/logo" component={GeneralLogo} />
        <Route path="/settings/theme" component={Theme} />
        <Route path="/settings/shipping" exact component={Shipping} />
        <Route path="/settings/shipping/add" exact component={ShippingEdit} />
        <Route path="/settings/shipping/:methodId" component={ShippingEdit} />
        <Route path="/settings/payments" exact component={Payments} />
        <Route path="/settings/payments/add" exact component={PaymentsEdit} />
        <Route path="/settings/payments/:methodId" component={PaymentsEdit} />
        <Route path="/settings/tokens" exact component={Tokens} />
        <Route path="/settings/tokens/add" exact component={TokensEdit} />
        <Route path="/settings/tokens/:tokenId" component={TokensEdit} />
        <Route path="/settings/email" exact component={Email} />
        <Route path="/settings/email/smtp" component={Smtp} />
        <Route
          path="/settings/email/templates/:templateName"
          component={EmailTemplate}
        />
        <Route path="/settings/import" exact component={Import} />
        <Route
          path="/settings/import/googlespreadsheet"
          exact
          component={GoogleSpredsheet}
        />
        <Route path="/settings/checkout" exact component={Checkout} />
        <Route
          path="/settings/checkout/fields/:fieldName"
          component={CheckoutFields}
        />
        <Route path="/settings/redirects" exact component={Redirects} />
        <Route path="/settings/redirects/add" exact component={RedirectsEdit} />
        <Route
          path="/settings/redirects/:redirectId"
          component={RedirectsEdit}
        />
        <Route path="/settings/webhooks" exact component={Webhooks} />
        <Route path="/settings/webhooks/add" exact component={WebhooksEdit} />
        <Route path="/settings/webhooks/:webhookId" component={WebhooksEdit} />
      </Switch>
    </div>
  </div>
)

export default Settings
