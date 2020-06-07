import { connect } from "react-redux"
import { fetchStatusesIfNeeded } from "../actions"
import List from "../components/list"

const mapStateToProps = (state: { orderStatuses: { items: any } }) => ({
  items: state.orderStatuses.items,
})

const mapDispatchToProps = (dispatch: (arg0: any) => void) => ({
  onLoad: () => {
    dispatch(fetchStatusesIfNeeded())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
