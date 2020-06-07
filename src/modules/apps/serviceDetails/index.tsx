import { connect } from "react-redux"
import {
  disableService, enableService, fetchService,



  fetchServiceLogs, updateServiceSettings
} from "../actions"
import Details from "./components/details"

const mapStateToProps = (state: { apps: { service: any; serviceSettings: any; serviceLogs: any; loadingEnableDisableService: any } }, ownProps: { match: { params: { serviceId: any } } }) => {
  const { serviceId } = ownProps.match.params

  return {
    serviceId,
    service: state.apps.service,
    serviceSettings: state.apps.serviceSettings,
    serviceLogs: state.apps.serviceLogs,
    loadingEnableDisable: state.apps.loadingEnableDisableService,
  }
}

const mapDispatchToProps = (dispatch: (arg0: { (dispatch: (arg0: { (dispatch: any, getState: any): any; (dispatch: any, getState: any): any; type?: string | undefined; service?: any }) => void): any; (dispatch: (arg0: { (dispatch: any, getState: any): any; type?: string | undefined }) => void): any; (dispatch: (arg0: { ... }) => void): any; (dispatch: (arg0: (dispatch: any, getState: any) => any) => void): any; (dispatch: (arg0: { ... }) => void): any }) => void, ownProps: { match: { params: { serviceId: any } } }) => ({
  fetchData: () => {
    const { serviceId } = ownProps.match.params
    dispatch(fetchService(serviceId))
  },
  enableService: () => {
    const { serviceId } = ownProps.match.params
    dispatch(enableService(serviceId))
  },
  disableService: () => {
    const { serviceId } = ownProps.match.params
    dispatch(disableService(serviceId))
  },
  updateSettings: (values: any) => {
    const { serviceId } = ownProps.match.params
    dispatch(updateServiceSettings(serviceId, values))
  },
  fetchServiceLogs: () => {
    const { serviceId } = ownProps.match.params
    dispatch(fetchServiceLogs(serviceId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)
