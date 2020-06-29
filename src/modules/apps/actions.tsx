import { Dispatch } from "redux"
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
) => {
  try {
    const { json } = api.webstore.account.retrieve()
    dispatch(receiveAccount(json))
  } catch (error) {
    console.error(error)
  }
}

export const updateAccount = (account: any) => (
  dispatch: (arg0: { type: string; account: any }) => void
) => {
  try {
    const { json } = api.webstore.account.update(account)
    dispatch(receiveAccount(json))
  } catch (error) {
    console.error(error)
  }
}

export const updateDeveloperAccount = (account: any) => (
  dispatch: (arg0: { type: string; account: any }) => void
) => {
  try {
    const { json } = api.webstore.account.updateDeveloper(account)
    dispatch(receiveAccount(json))
  } catch (error) {
    console.error(error)
  }
}

export const fetchServices = () => (
  dispatch: (arg0: { type: string; services: any }) => void
) => {
  try {
    const { json } = api.webstore.services.list()
    dispatch(receiveServices(json))
  } catch (error) {
    console.error(error)
  }
}

export const fetchService = (serviceId: any) => (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    (dispatch: any, getState: any): any
    type?: string
    service?: any
  }) => void
) => {
  try {
    const { json } = api.webstore.services.retrieve(serviceId)
    const service = json
    dispatch(receiveService(service))
    if (service.enabled) {
      dispatch(fetchServiceSettings(serviceId))
      dispatch(fetchServiceLogs(serviceId))
    }
  } catch (error) {
    console.error(error)
  }
}

export const enableService = (serviceId: any) => (dispatch: Dispatch) => {
  dispatch(requestEnableDisableService())
  try {
    api.webstore.services.enable(serviceId)
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  } catch (error) {
    console.error(error)
  }
}

export const disableService = (serviceId: any) => (dispatch: Dispatch) => {
  dispatch(requestEnableDisableService())
  try {
    api.webstore.services.disable(serviceId)
    dispatch(receiveEnableDisableService())
    dispatch(fetchService(serviceId))
  } catch (error) {
    console.error(error)
  }
}

export const fetchServiceSettings = (serviceId: string) => (
  dispatch: Dispatch
) => {
  dispatch(requestServiceSettings())
  try {
    const { json } = api.webstore.services.settings.retrieve(serviceId)
    const serviceSettings = json
    return dispatch(receiveServiceSettings(serviceSettings))
  } catch (error) {
    console.error(error)
  }
}

export const updateServiceSettings = (serviceId: any, settings: any) => (
  dispatch: Dispatch
) => {
  try {
    api.webstore.services.settings.update(serviceId, settings)
    dispatch(fetchServiceSettings(serviceId))
  } catch (error) {
    console.error(error)
  }
}

export const fetchServiceLogs = (serviceId: string) => (dispatch: Dispatch) => {
  try {
    const { json } = api.webstore.services.logs.list(serviceId)
    dispatch(receiveServiceLogs(json))
  } catch (error) {
    console.error(error)
  }
}
