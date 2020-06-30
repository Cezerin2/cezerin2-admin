import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Dispatch } from "redux"
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchData: () => {
    dispatch(fetchServices())
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
