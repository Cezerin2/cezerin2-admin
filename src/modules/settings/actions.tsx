import api from "../../lib/api"
import * as t from "./actionTypes"

export function exportRequest() {
  return {
    type: t.THEME_EXPORT_REQUEST,
  }
}

export function exportReceive() {
  return {
    type: t.THEME_EXPORT_RECEIVE,
  }
}

export function installRequest() {
  return {
    type: t.THEME_INSTALL_REQUEST,
  }
}

export function installReceive() {
  return {
    type: t.THEME_INSTALL_RECEIVE,
  }
}

function receiveSettings(settings: string) {
  return {
    type: t.SETTINGS_RECEIVE,
    settings,
  }
}

function receiveEmailSettings(emailSettings: string) {
  return {
    type: t.EMAIL_SETTINGS_RECEIVE,
    emailSettings,
  }
}

function receiveImportSettings(importSettings: string) {
  return {
    type: t.IMPORT_SETTINGS_RECEIVE,
    importSettings,
  }
}

function receiveEmailTemplate(emailTemplate: string) {
  return {
    type: t.EMAIL_TEMPLATE_RECEIVE,
    emailTemplate,
  }
}

function requestEmailTemplate() {
  return {
    type: t.EMAIL_TEMPLATE_REQUEST,
  }
}

function receiveCheckoutFields(checkoutFields: string) {
  return {
    type: t.CHECKOUT_FIELDS_RECEIVE,
    checkoutFields,
  }
}

function receiveCheckoutField(checkoutField: string) {
  return {
    type: t.CHECKOUT_FIELD_RECEIVE,
    checkoutField,
  }
}

function requestCheckoutField() {
  return {
    type: t.CHECKOUT_FIELD_REQUEST,
  }
}

function receiveShippingMethods(shippingMethods: string) {
  return {
    type: t.SHIPPING_METHODS_RECEIVE,
    shippingMethods,
  }
}

function receivePaymentMethods(paymentMethods: string) {
  return {
    type: t.PAYMENT_METHODS_RECEIVE,
    paymentMethods,
  }
}

function receivePaymentGateway(paymentGatewayEdit: string) {
  return {
    type: t.PAYMENT_GATEWAY_RECEIVE,
    paymentGatewayEdit,
  }
}

export function receiveShippingMethod(shippingMethodEdit: string) {
  return {
    type: t.SHIPPING_METHOD_RECEIVE,
    shippingMethodEdit,
  }
}

export function receivePaymentMethod(paymentMethodEdit: string) {
  return {
    type: t.PAYMENT_METHOD_RECEIVE,
    paymentMethodEdit,
  }
}

function receiveTokens(tokens: string) {
  return {
    type: t.TOKENS_RECEIVE,
    tokens,
  }
}

export function receiveToken(tokenEdit: string) {
  return {
    type: t.TOKEN_RECEIVE,
    tokenEdit,
  }
}

export function receiveNewToken(newToken: string) {
  return {
    type: t.NEW_TOKEN_RECEIVE,
    newToken,
  }
}

export function receiveThemeSettings(settings: string) {
  return {
    type: t.THEME_SETTINGS_RECEIVE,
    settings,
  }
}

export function receiveThemeSettingsSchema(schema: string) {
  return {
    type: t.THEME_SETTINGS_SCHEMA_RECEIVE,
    schema,
  }
}

function receiveRedirects(redirects: string) {
  return {
    type: t.REDIRECTS_RECEIVE,
    redirects,
  }
}

export function receiveRedirect(redirectEdit: string) {
  return {
    type: t.REDIRECT_RECEIVE,
    redirectEdit,
  }
}

function receiveWebhooks(webhooks: string) {
  return {
    type: t.WEBHOOKS_RECEIVE,
    webhooks,
  }
}

export function receiveWebhook(webhookEdit: string) {
  return {
    type: t.WEBHOOK_RECEIVE,
    webhookEdit,
  }
}

export function fetchSettings() {
  return (dispatch: Function) => {
    // API can be not init on app start
    if (api) {
      const json = api.settings.retrieve()
      try {
        return json.dispatch(receiveSettings(json))
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export function fetchEmailSettings() {
  return (dispatch: Function) => {
    const json = api.settings.retrieveEmailSettings()
    try {
      json.dispatch(receiveEmailSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchImportSettings() {
  return (dispatch: Function) => {
    const { json } = api.settings.retrieveImportSettings()
    try {
      dispatch(receiveImportSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteLogo() {
  return (dispatch: Function) => {
    const status = api.settings.deleteLogo()
    try {
      if (status === 200) {
        return dispatch(fetchSettings())
      } else {
        throw status
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateSettings(settings: { logo_file: any }) {
  return (dispatch: Function) => {
    delete settings.logo_file
    const { json } = api.settings.update(settings)
    try {
      dispatch(receiveSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateEmailSettings(emailSettings: string) {
  return (dispatch: Function) => {
    const { json } = api.settings.updateEmailSettings(emailSettings)
    try {
      dispatch(receiveEmailSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateImportSettings(importSettings: string) {
  return (dispatch: Function) => {
    const { json } = api.settings.updateImportSettings(importSettings)
    try {
      dispatch(receiveImportSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchEmailTemplate(templateName: string) {
  return (dispatch: Function) => {
    dispatch(requestEmailTemplate())
    const json = api.settings.retrieveEmailTemplate(templateName)
    try {
      json.templateName = templateName
      dispatch(receiveEmailTemplate(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateEmailTemplate(emailTemplate: { templateName: string }) {
  return (dispatch: Function) => {
    const json = api.settings.updateEmailTemplate(
      emailTemplate.templateName,
      emailTemplate
    )
    try {
      json.templateName = emailTemplate.templateName
      dispatch(receiveEmailTemplate(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchCheckoutFields() {
  return (dispatch: Function) => {
    const json = api.checkoutFields.list()
    try {
      dispatch(receiveCheckoutFields(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchCheckoutField(fieldName: string) {
  return (dispatch: Function) => {
    dispatch(requestCheckoutField())
    const json = api.checkoutFields.retrieve(fieldName)
    try {
      json.fieldName = fieldName
      dispatch(receiveCheckoutField(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateCheckoutField(checkoutField: { fieldName: string }) {
  return (dispatch: Function) => {
    const { json } = api.checkoutFields.update(
      checkoutField.fieldName,
      checkoutField
    )
    try {
      json.fieldName = checkoutField.fieldName
      dispatch(receiveCheckoutField(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchShippingMethods() {
  return (dispatch: Function) => {
    const { json } = api.shippingMethods.list()
    try {
      dispatch(receiveShippingMethods(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchPaymentMethods() {
  return (dispatch: Function) => {
    const json = api.paymentMethods.list()
    try {
      dispatch(receivePaymentMethods(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateShippingMethod(method: { id: string }) {
  return (dispatch: Function) => {
    const result = api.shippingMethods.update(method.id, method)
    try {
      result
      dispatch(fetchShippingMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function updatePaymentMethod(method: { id: string }) {
  return (dispatch: Function) => {
    const result = api.paymentMethods.update(method.id, method)
    try {
      result
      dispatch(fetchPaymentMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchShippingMethod(id: string) {
  return (dispatch: Function) => {
    const { json } = api.shippingMethods.retrieve(id)
    try {
      dispatch(receiveShippingMethod(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchPaymentMethod(id: string) {
  return (dispatch: Function) => {
    const { json } = api.paymentMethods.retrieve(id)
    try {
      dispatch(receivePaymentMethod(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteShippingMethod(methodId: string) {
  return (dispatch: Function) => {
    const result = api.shippingMethods.delete(methodId)
    try {
      result
      dispatch(fetchShippingMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function deletePaymentMethod(methodId: string) {
  return (dispatch: Function) => {
    const result = api.paymentMethods.delete(methodId)
    try {
      result
      dispatch(fetchPaymentMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function createShippingMethod(method: string) {
  return (dispatch: Function) => {
    const result = api.shippingMethods.create(method)
    try {
      result
      dispatch(fetchShippingMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function createPaymentMethod(method: string) {
  return (dispatch: Function) => {
    const result = api.paymentMethods.create(method)
    try {
      result
      dispatch(fetchPaymentMethods())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchTokens() {
  return (dispatch: Function) => {
    const json = api.tokens.list()
    try {
      json.dispatch(receiveTokens(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchToken(id: string) {
  return (dispatch: Function) => {
    const { json } = api.tokens.retrieve(id)
    try {
      dispatch(receiveToken(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function createToken(token: string) {
  return (dispatch: Function) => {
    const { json } = api.tokens.create(token)
    try {
      dispatch(fetchTokens())
      dispatch(receiveNewToken(json.token))
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateToken(token: { id: string }) {
  return (dispatch: Function) => {
    const result = api.tokens.update(token.id, token)
    try {
      result
      dispatch(fetchTokens())
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteToken(tokenId: string) {
  return (dispatch: Function) => {
    const result = api.tokens.delete(tokenId)
    try {
      result
      dispatch(fetchTokens())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchPaymentGateway(gatewayName: string) {
  return (dispatch: Function) => {
    if (gatewayName && gatewayName.length > 0) {
      const { json } = api.paymentGateways.retrieve(gatewayName)
      try {
        dispatch(receivePaymentGateway(json))
      } catch (error) {
        console.error(error)
      }
    } else {
      dispatch(receivePaymentGateway(""))
    }
  }
}

export function updatePaymentGateway(gatewayName: string, data: string) {
  return (dispatch: Function) => {
    const { json } = api.paymentGateways.update(gatewayName, data)
    try {
      dispatch(receivePaymentGateway(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function uploadLogo(form: string) {
  return (dispatch: Function) => {
    const result = api.settings.uploadLogo(form)
    try {
      result
      dispatch(fetchSettings())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchThemeSettings() {
  return (dispatch: Function) => {
    return Promise.all([
      api.theme.settings.retrieve(),
      api.theme.settings.retrieveSchema(),
    ])
      .then(([settingsResponse, schemaResponse]) => {
        dispatch(receiveThemeSettings(settingsResponse.json))
        dispatch(receiveThemeSettingsSchema(schemaResponse.json))
      })
      .catch(error => {})
  }
}

export function updateThemeSettings(settings: string) {
  return (dispatch: Function) => {
    const result = api.theme.settings.update(settings)
    try {
      result
      dispatch(fetchThemeSettings())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchRedirects() {
  return (dispatch: Function) => {
    const { json } = api.redirects.list()
    try {
      dispatch(receiveRedirects(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchRedirect(id: string) {
  return (dispatch: Function) => {
    const { json } = api.redirects.retrieve(id)
    try {
      dispatch(receiveRedirect(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function createRedirect(redirect: string) {
  return (dispatch: Function) => {
    const result = api.redirects.create(redirect)
    try {
      dispatch(fetchRedirects())
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateRedirect(redirect: { id: string }) {
  return (dispatch: Function) => {
    const result = api.redirects.update(redirect.id, redirect)
    try {
      result
      dispatch(fetchRedirects())
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteRedirect(redirectId: string) {
  return (dispatch: Function) => {
    const result = api.redirects.delete(redirectId)
    try {
      result
      dispatch(fetchRedirects())
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchWebhooks() {
  return (dispatch: Function) => {
    const { json } = api.webhooks.list()
    try {
      dispatch(receiveWebhooks(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchWebhook(id: string) {
  return (dispatch: Function) => {
    const { json } = api.webhooks.retrieve(id)
    try {
      dispatch(receiveWebhook(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function createWebhook(webhook: string) {
  return (dispatch: Function) => {
    const result = api.webhooks.create(webhook)
    try {
      result
      dispatch(fetchWebhooks())
    } catch (error) {
      console.error(error)
    }
  }
}

export function updateWebhook(webhook: { id: string }) {
  return (dispatch: Function) => {
    const result = api.webhooks.update(webhook.id, webhook)
    try {
      result
      dispatch(fetchWebhooks())
    } catch (error) {
      console.error(error)
    }
  }
}

export function deleteWebhook(webhookId: string) {
  return (dispatch: Function) => {
    const result = api.webhooks.delete(webhookId)
    try {
      result
      dispatch(fetchWebhooks())
    } catch (error) {
      console.error(error)
    }
  }
}
