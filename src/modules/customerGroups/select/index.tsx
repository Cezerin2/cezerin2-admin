import { connect } from "react-redux"
import { fetchGroupsIfNeeded } from "../actions"
import List from "../components/list"

const mapStateToProps = (state: { customerGroups: { items: any } }) => ({
  items: state.customerGroups.items,
})

const mapDispatchToProps = (
  dispatch: (arg0: (dispatch: any, getState: any) => any) => void
) => ({
  onLoad: () => {
    dispatch(fetchGroupsIfNeeded())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
