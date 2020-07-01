import { connect } from "react-redux"
import { withRouter } from "react-router"
import { deleteShippingMethod } from "../actions"
import Buttons from "./components/headButtons"

const mapStateToProps = (state: {
  settings: { shippingMethodEdit: string }
}) => ({
  shippingMethod: state.settings.shippingMethodEdit,
})

const mapDispatchToProps = (dispatch: Function, ownProps: any) => ({
  onDelete: (id: string) => {
    dispatch(deleteShippingMethod(id))
    ownProps.history.push("/settings/shipping")
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
