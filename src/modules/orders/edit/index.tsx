import { connect } from "react-redux"
import { withRouter } from "react-router"
import {
  checkoutOrder,
  clearOrderDetails,
  deleteOrderItem,
  fetchOrder,
  updateOrder,
  updateOrderItem,
  updateShippingAddress,
} from "../actions"
import OrderDetails from "./components/details"

const mapStateToProps = (state: {
  settings: { settings: any }
  orders: { editOrder: any; processingCheckout: any }
}) => ({
  settings: state.settings.settings,
  order: state.orders.editOrder,
  processingCheckout: state.orders.processingCheckout,
})

const mapDispatchToProps = (
  dispatch: (arg0: {
    (dispatch: any, getState: any): any
    (dispatch: any, getState: any): void
    (dispatch: any, getState: any): void
    (dispatch: any, getState: any): any
    (dispatch: any, getState: any): any
    (dispatch: any, getState: any): any
    type?: string
    item?: any
  }) => void,
  ownProps: { match: { params: { orderId: any } } }
) => ({
  fetchData: () => {
    const { orderId } = ownProps.match.params
    dispatch(fetchOrder(orderId))
  },
  clearData: () => {
    dispatch(clearOrderDetails())
  },
  onItemDelete: (itemId: any) => {
    const { orderId } = ownProps.match.params
    dispatch(deleteOrderItem(orderId, itemId))
  },
  onItemUpdate: (itemId: any, quantity: any, variantId: any) => {
    const { orderId } = ownProps.match.params
    dispatch(updateOrderItem(orderId, itemId, quantity, variantId))
  },
  onShippingAddressUpdate: (address: any) => {
    const { orderId } = ownProps.match.params
    dispatch(updateShippingAddress(orderId, address))
  },
  onOrderSummaryUpdate: (order: {
    id: any
    tracking_number: any
    status_id: any
    shipping_method_id: any
    payment_method_id: any
    comments: any
    note: any
    email: any
    mobile: any
  }) => {
    const { orderId } = ownProps.match.params
    dispatch(
      updateOrder({
        id: order.id,
        tracking_number: order.tracking_number,
        status_id: order.status_id,
        shipping_method_id: order.shipping_method_id,
        payment_method_id: order.payment_method_id,
        comments: order.comments,
        note: order.note,
        email: order.email,
        mobile: order.mobile,
      })
    )
  },
  onCheckout: () => {
    const { orderId } = ownProps.match.params
    dispatch(checkoutOrder(orderId))
  },
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
)
