import { connect } from "react-redux"
import { withRouter } from "react-router"
import Buttons from "./components/buttons"

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
