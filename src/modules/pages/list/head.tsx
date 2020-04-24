import { connect } from "react-redux"
import { withRouter } from "react-router"
import Buttons from "./components/headButtons"

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
