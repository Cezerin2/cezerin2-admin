import api from "../../lib/api"
import * as t from "./actionTypes"

const receiveAccount = (account: any) => ({
  type: t.ACCOUNT_RECEIVE,
  account,
})

const receiveServices = (services: any) => ({
  type: t.SERVICES_RECEIVE,
  services,
})

const receiveService = (service: any) => ({
  type: t.SERVICE_RECEIVE,
  service,
})

const requestEnableDisableService = () => ({
  type: t.SERVICE_ENABLE_REQUEST,
})

const receiveEnableDisableService = () => ({
  type: t.SERVICE_ENABLE_RECEIVE,
})

const requestServiceSettings = () => ({
  type: t.SERVICE_SETTINGS_REQUEST,
})

const receiveServiceSettings = (serviceSettings: any) => ({
  type: t.SERVICE_SETTINGS_RECEIVE,
  serviceSettings,
})

const receiveServiceLogs = (serviceLogs: any) => ({
  type: t.SERVICE_LOGS_RECEIVE,
  serviceLogs,
})

export const fetchAccount = () => (
  dispatch: (arg0: { type: string; account: any }) => void
) =>
  api.webstore.account.retrieve().then(({ json }) => {
    dispatch(receiveAccount(json))
  })

export const updateAccount = (account: any) => (
  dispatch: (arg0: { type: string; account: any }) => void
) =>
  api.webstore.account.update(account).then(({ json }) => {
    dispatch(receiveAccount(json))
  })

export const updateDeveloperAccount = (account: any) => (
  dispatch: (arg0: { type: string; account: any }) => void
) =>
  api.webstore.account.updateDeveloper(account).then(({ json }) => {
    dispatch(receiveAccount(json))
  })

export const fetchServices = () => (
  dispatch: (arg0: { type: string; services: any }) => void
) =>
  api.webstore.services.list().then(({ json }) => {
    dispatch(receiveServices(json))
  })

export const fetchService = (serviceId: any) => (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    (dispatch: any, getState: any): any
    type?: string
    service?: any
  }) => void
) =>
  api.webstore.services.retrieve(serviceId).then(({ json }) => {
    const service = json
    dispatch(receiveService(service))
    if (service.enabled) {
      dispatch(fetchServiceSettings(serviceId))
      dispatch(fetchServiceLogs(serviceId))
    }
  })

export const enableService = (serviceId: any) => (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    type?: string
  }) => void
) => {
  dispatch(requestEnableDisableService())
  return api.webstore.services.enable(serviceId).then(() => {
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  })
}

export const disableService = (serviceId: any) => (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    type?: string
  }) => void
) => {
  dispatch(requestEnableDisableService())
  return api.webstore.services.disable(serviceId).then(() => {
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  })
}

export const fetchServiceSettings = (serviceId: any) => (
  dispatch: (arg0: { type: string; serviceSettings?: any }) => void
) => {
  dispatch(requestServiceSettings())
  return api.webstore.services.settings
    .retrieve(serviceId)
    .then(({ json }) => {
      const serviceSettings = json
      dispatch(receiveServiceSettings(serviceSettings))
    })
    .catch(() => {})
}

export const updateServiceSettings = (serviceId: any, settings: any) => (
  dispatch: (arg0: (dispatch: any, getState: any) => any) => void
) =>
  api.webstore.services.settings
    .update(serviceId, settings)
    .then(() => {
      dispatch(fetchServiceSettings(serviceId))
    })
    .catch(() => {})

export const fetchServiceLogs = (serviceId: any) => (
  dispatch: (arg0: { type: string; serviceLogs: any }) => void
) =>
  api.webstore.services.logs
    .list(serviceId)
    .then(({ json }) => {
      dispatch(receiveServiceLogs(json))
    })
    .catch(() => {})
