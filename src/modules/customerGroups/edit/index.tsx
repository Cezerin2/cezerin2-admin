import { connect } from "react-redux"
import { reset } from "redux-form"
import { createGroup, deselectGroup, updateGroup } from "../actions"
import Form from "./components/form"

const mapStateToProps = (state: {
  customerGroups: { selectedId: any; items: any[]; isSaving: any }
}) => ({
  groupId: state.customerGroups.selectedId,
  items: state.customerGroups.items,
  initialValues: state.customerGroups.items.find(
    (item: { id: any }) => item.id === state.customerGroups.selectedId
  ),
  isSaving: state.customerGroups.isSaving,
})

const mapDispatchToProps = (
  dispatch: (arg0: import("redux-form").FormAction) => void
) => ({
  onSubmit: (values: { id: any }) => {
    if (values.id) {
      dispatch(updateGroup(values))
    } else {
      dispatch(createGroup(values))
    }
  },
  onCancel: () => {
    dispatch(deselectGroup())
    dispatch(reset("FormCustomerGroup"))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
