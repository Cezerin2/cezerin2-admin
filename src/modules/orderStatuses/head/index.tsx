import { connect } from "react-redux"
import { reset } from "redux-form"
import { deleteStatus, deselectStatus } from "../actions"
import Buttons from "./components/buttons"

const mapStateToProps = (state: {
  orderStatuses: { items: any[]; selectedId: any }
}) => ({
  selected: state.orderStatuses.items.find(
    (item: { id: any }) => item.id === state.orderStatuses.selectedId
  ),
})

const mapDispatchToProps = (
  dispatch: (arg0: import("redux-form").FormAction) => void
) => ({
  onDelete: (id: any) => {
    dispatch(deleteStatus(id))
    dispatch(reset("FormOrderStatus"))
  },
  onCreate: () => {
    dispatch(deselectStatus())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Buttons)
