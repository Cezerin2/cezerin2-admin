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
  return dispatch => {
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
  return dispatch => {
    const json = api.settings.retrieveEmailSettings()
    try {
      json.dispatch(receiveEmailSettings(json))
    } catch (error) {
      console.error(error)
    }
  }
}

export function fetchImportSettings() {
  return (dispatch, getState) => {
    return api.settings
      .retrieveImportSettings()
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
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
    return api.settings
      .update(settings)
      .then(({ status, json }) => {
        dispatch(receiveSettings(json))
      })
      .catch(error => {})
  }
}

export function updateEmailSettings(emailSettings: string) {
  return (dispatch: Function) => {
    return api.settings
      .updateEmailSettings(emailSettings)
      .then(({ status, json }) => {
        dispatch(receiveEmailSettings(json))
      })
      .catch(error => {})
  }
}

export function updateImportSettings(importSettings: string) {
  return (dispatch, getState) => {
    return api.settings
      .updateImportSettings(importSettings)
      .then(({ status, json }) => {
        dispatch(receiveImportSettings(json))
      })
      .catch(error => {})
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
      json.templateName = templateName
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
  return (dispatch, getState) => {
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

export function updateCheckoutField(checkoutField) {
  return (dispatch: Function) => {
    return api.checkoutFields
      .update(checkoutField.fieldName, checkoutField)
      .then(({ status, json }) => {
        json.fieldName = fieldName
        dispatch(receiveCheckoutField(json))
      })
      .catch(error => {})
  }
}

export function fetchShippingMethods() {
  return (dispatch, getState) => {
    return api.shippingMethods
      .list()
      .then(({ status, json }) => {
        dispatch(receiveShippingMethods(json))
      })
      .catch(error => {})
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

export function updatePaymentMethod(method) {
  return (dispatch: Function) => {
    return api.paymentMethods
      .update(method.id, method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function fetchShippingMethod(id) {
  return (dispatch, getState) => {
    return api.shippingMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveShippingMethod(json))
      })
      .catch(error => {})
  }
}

export function fetchPaymentMethod(id) {
  return (dispatch, getState) => {
    return api.paymentMethods
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receivePaymentMethod(json))
      })
      .catch(error => {})
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
    return api.paymentMethods
      .delete(methodId)
      .then(() => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
  }
}

export function createShippingMethod(method: string) {
  return (dispatch: Function) => {
    return api.shippingMethods
      .create(method)
      .then(() => {
        dispatch(fetchShippingMethods())
      })
      .catch(error => {})
  }
}

export function createPaymentMethod(method) {
  return (dispatch: Function) => {
    return api.paymentMethods
      .create(method)
      .then(({ status, json }) => {
        dispatch(fetchPaymentMethods())
      })
      .catch(error => {})
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
    return api.tokens
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveToken(json))
      })
      .catch(error => {})
  }
}

export function createToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .create(token)
      .then(({ status, json }) => {
        //console.log(json);
        dispatch(fetchTokens())
        dispatch(receiveNewToken(json.token))
      })
      .catch(error => {})
  }
}

export function updateToken(token) {
  return (dispatch, getState) => {
    return api.tokens
      .update(token.id, token)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function deleteToken(tokenId) {
  return (dispatch, getState) => {
    return api.tokens
      .delete(tokenId)
      .then(({ status, json }) => {
        dispatch(fetchTokens())
      })
      .catch(error => {})
  }
}

export function fetchPaymentGateway(gatewayName) {
  return (dispatch, getState) => {
    if (gatewayName && gatewayName.length > 0) {
      return api.paymentGateways
        .retrieve(gatewayName)
        .then(({ status, json }) => {
          dispatch(receivePaymentGateway(json))
        })
        .catch(error => {})
    } else {
      dispatch(receivePaymentGateway(null))
    }
  }
}

export function updatePaymentGateway(gatewayName, data) {
  return (dispatch: Function) => {
    return api.paymentGateways
      .update(gatewayName, data)
      .then(({ status, json }) => {
        dispatch(receivePaymentGateway(json))
      })
      .catch(error => {})
  }
}

export function uploadLogo(form: string) {
  return (dispatch: Function) => {
    return api.settings
      .uploadLogo(form)
      .then(() => {
        dispatch(fetchSettings())
      })
      .catch(error => {})
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
    return api.theme.settings
      .update(settings)
      .then(() => {
        dispatch(fetchThemeSettings())
      })
      .catch(error => {})
  }
}

export function fetchRedirects() {
  return (dispatch: Function) =>
    api.redirects
      .list()
      .then(({ status, json }) => {
        dispatch(receiveRedirects(json))
      })
      .catch(error => {})
}

export function fetchRedirect(id) {
  return (dispatch: Function) =>
    api.redirects
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveRedirect(json))
      })
      .catch(error => {})
}

export function createRedirect(redirect) {
  return (dispatch, getState) =>
    api.redirects
      .create(redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
}

export function updateRedirect(redirect) {
  return (dispatch, getState) =>
    api.redirects
      .update(redirect.id, redirect)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
}

export function deleteRedirect(redirectId) {
  return (dispatch, getState) =>
    api.redirects
      .delete(redirectId)
      .then(({ status, json }) => {
        dispatch(fetchRedirects())
      })
      .catch(error => {})
}

export function fetchWebhooks() {
  return (dispatch: Function) => {
    return api.webhooks
      .list()
      .then(({ status, json }) => {
        dispatch(receiveWebhooks(json))
      })
      .catch(error => {})
  }
}

export function fetchWebhook(id: string) {
  return (dispatch: Function) => {
    return api.webhooks
      .retrieve(id)
      .then(({ status, json }) => {
        dispatch(receiveWebhook(json))
      })
      .catch(error => {})
  }
}

export function createWebhook(webhook: string) {
  return (dispatch: Function) => {
    return api.webhooks
      .create(webhook)
      .then(() => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function updateWebhook(webhook: { id: string }) {
  return (dispatch: Function) => {
    return api.webhooks
      .update(webhook.id, webhook)
      .then(() => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}

export function deleteWebhook(webhookId: string) {
  return (dispatch: Function) => {
    return api.webhooks
      .delete(webhookId)
      .then(() => {
        dispatch(fetchWebhooks())
      })
      .catch(error => {})
  }
}
