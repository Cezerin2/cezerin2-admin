import { connect } from "react-redux"
import { withRouter } from "react-router"
import * as webstoreAuth from "../../../lib/webstoreAuth"
import { fetchServices } from "../actions"
import List from "./components/list"

const mapStateToProps = (state: { apps: { services: any } }) => {
  const webstoreAuthorized = webstoreAuth.isCurrentTokenValid()
  return {
    services: state.apps.services,
    webstoreAuthorized,
  }
}

const mapDispatchToProps = (
  dispatch: (
    arg0: (
      dispatch: (arg0: { type: string; services: any }) => void,
      getState: any
    ) => any
  ) => void
) => ({
  fetchData: () => {
    dispatch(fetchServices())
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
