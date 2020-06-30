import { connect } from "react-redux"
import { Dispatch } from "redux"
import { fetchGroupsIfNeeded } from "../actions"
import List from "../components/list"

const mapStateToProps = (state: { customerGroups: { items: string } }) => ({
  items: state.customerGroups.items,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoad: () => {
    dispatch(fetchGroupsIfNeeded())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
