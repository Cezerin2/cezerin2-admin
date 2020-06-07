import { connect } from "react-redux"
import { reset } from "redux-form"
import { createStatus, deselectStatus, updateStatus } from "../actions"
import Form from "./components/form"

const mapStateToProps = (state: {
  orderStatuses: { selectedId: any; items: any[]; isSaving: any }
}) => ({
  statusId: state.orderStatuses.selectedId,
  items: state.orderStatuses.items,
  initialValues: state.orderStatuses.items.find(
    (item: { id: any }) => item.id === state.orderStatuses.selectedId
  ),
  isSaving: state.orderStatuses.isSaving,
})

const mapDispatchToProps = (
  dispatch: (arg0: import("redux-form").FormAction) => void
) => ({
  onSubmit: (values: { id: any }) => {
    if (values.id) {
      dispatch(updateStatus(values))
    } else {
      dispatch(createStatus(values))
    }
  },
  onCancel: () => {
    dispatch(deselectStatus())
    dispatch(reset("FormOrderStatus"))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
