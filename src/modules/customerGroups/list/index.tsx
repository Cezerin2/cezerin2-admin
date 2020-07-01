import { connect } from "react-redux"
import { Dispatch } from "redux"
import { fetchCustomers } from "../../customers/actions"
import { fetchGroupsIfNeeded, selectGroup } from "../actions"
import List from "../components/list"

const mapStateToProps = (state: {
  customerGroups: { items: string; selectedId: string }
}) => ({
  items: state.customerGroups.items,
  selectedId: state.customerGroups.selectedId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoad: () => {
    dispatch(fetchGroupsIfNeeded())
  },
  onSelect: (groupID: string) => {
    dispatch(selectGroup(groupID))
    dispatch(fetchCustomers())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
