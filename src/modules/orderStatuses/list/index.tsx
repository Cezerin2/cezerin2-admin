import { connect } from "react-redux"
import { fetchOrders } from "../../orders/actions"
import { fetchStatusesIfNeeded, selectStatus } from "../actions"
import List from "../components/list"

const mapStateToProps = (state: {
  orderStatuses: { items: any; selectedId: any }
}) => ({
  items: state.orderStatuses.items,
  selectedId: state.orderStatuses.selectedId,
})

const mapDispatchToProps = (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    (
      dispatch: (arg0: {
        type: string
        has_more?: any
        total_count?: any
        data?: any
        error?: any
      }) => void,
      getState: () => any
    ): any
    type?: string
    selectedId?: any
  }) => void
) => ({
  onLoad: () => {
    dispatch(fetchStatusesIfNeeded())
  },
  onSelect: (statusId: any) => {
    dispatch(selectStatus(statusId))
    dispatch(fetchOrders())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
