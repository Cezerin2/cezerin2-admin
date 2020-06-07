import api from "../../lib/api"
import * as t from "./actionTypes"

function requestOrder() {
  return {
    type: t.ORDER_DETAIL_REQUEST,
  }
}

function receiveOrder(item: null) {
  return {
    type: t.ORDER_DETAIL_RECEIVE,
    item,
  }
}

export function clearOrderDetails() {
  return receiveOrder(null)
}

function requestOrders() {
  return {
    type: t.ORDERS_REQUEST,
  }
}

function requestMoreOrders() {
  return {
    type: t.ORDERS_MORE_REQUEST,
  }
}

function receiveOrdersMore({ has_more, total_count, data }) {
  return {
    type: t.ORDERS_MORE_RECEIVE,
    has_more,
    total_count,
    data,
  }
}

function receiveOrders({ has_more, total_count, data }) {
  return {
    type: t.ORDERS_RECEIVE,
    has_more,
    total_count,
    data,
  }
}

function receiveOrdersError(error: any) {
  return {
    type: t.ORDERS_FAILURE,
    error,
  }
}

function requestOrderCheckout() {
  return {
    type: t.ORDER_CHECKOUT_REQUEST,
  }
}

function receiveOrderCheckout() {
  return {
    type: t.ORDER_CHECKOUT_RECEIVE,
  }
}

function failOrderCheckout(error: any) {
  return {
    type: t.ORDER_CHECKOUT_FAILURE,
    error,
  }
}

export function selectOrder(id: any) {
  return {
    type: t.ORDERS_SELECT,
    orderId: id,
  }
}

export function deselectOrder(id: any) {
  return {
    type: t.ORDERS_DESELECT,
    orderId: id,
  }
}

export function deselectAllOrder() {
  return {
    type: t.ORDERS_DESELECT_ALL,
  }
}

export function selectAllOrder() {
  return {
    type: t.ORDERS_SELECT_ALL,
  }
}

export function setFilter(filter: {
  search?: any
  date_placed_min?: any
  date_placed_max?: any
  cancelled?: any
  delivered?: any
  paid?: any
  hold?: any
  draft?: any
  closed?: any
}) {
  return {
    type: t.ORDERS_SET_FILTER,
    filter,
  }
}

function requestBulkUpdate() {
  return {
    type: t.ORDERS_BULK_UPDATE_REQUEST,
  }
}

function receiveBulkUpdate() {
  return {
    type: t.ORDERS_BULK_UPDATE_SUCCESS,
  }
}

function errorBilkUpdate() {
  return {
    type: t.ORDERS_BULK_UPDATE_FAILURE,
  }
}

function deleteOrdersSuccess() {
  return {
    type: t.ORDER_DELETE_SUCCESS,
  }
}

function createOrdersSuccess() {
  return {
    type: t.ORDER_CREATE_SUCCESS,
  }
}

function requestOrderUpdate() {
  return {
    type: t.ORDER_UPDATE_REQUEST,
  }
}

function receiveOrderUpdate() {
  return {
    type: t.ORDER_UPDATE_SUCCESS,
  }
}

function failOrderUpdate(error: any) {
  return {
    type: t.ORDER_UPDATE_FAILURE,
    error,
  }
}

const getFilter = (
  state: { orders: any[]; orderStatuses: { selectedId: any } },
  offset = 0
) => {
  const filterState = state.orders.filter
  const filter = {
    limit: 50,
    offset,
  }

  if (filterState.search !== null && filterState.search !== "") {
    filter.search = filterState.search
  }

  if (filterState.closed !== null) {
    filter.closed = filterState.closed
  }

  if (filterState.cancelled !== null) {
    filter.cancelled = filterState.cancelled
  }

  if (filterState.delivered !== null) {
    filter.delivered = filterState.delivered
  }

  if (filterState.paid !== null) {
    filter.paid = filterState.paid
  }

  if (filterState.hold !== null) {
    filter.hold = filterState.hold
  }

  if (filterState.draft !== null) {
    filter.draft = filterState.draft
  }

  if (filterState.date_placed_min) {
    filter.date_placed_min = filterState.date_placed_min
  }

  if (filterState.date_placed_max) {
    filter.date_placed_max = filterState.date_placed_max
  }

  if (state.orderStatuses.selectedId) {
    filter.status_id = state.orderStatuses.selectedId
  }

  return filter
}

export function fetchOrders() {
  return (
    dispatch: (arg0: {
      type: string
      has_more?: any
      total_count?: any
      data?: any
      error?: any
    }) => void,
    getState: () => any
  ) => {
    const state = getState()
    if (!state.orders.loadingItems) {
      dispatch(requestOrders())
      dispatch(deselectAllOrder())

      const filter = getFilter(state)

      return api.orders
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveOrders(json))
        })
        .catch((error: any) => {
          dispatch(receiveOrdersError(error))
        })
    }
  }
}

export function fetchMoreOrders() {
  return (
    dispatch: (arg0: {
      type: string
      has_more?: any
      total_count?: any
      data?: any
      error?: any
    }) => void,
    getState: () => any
  ) => {
    const state = getState()
    if (!state.orders.loadingItems) {
      dispatch(requestMoreOrders())

      const filter = getFilter(state, state.orders.items.length)

      return api.orders
        .list(filter)
        .then(({ status, json }) => {
          dispatch(receiveOrdersMore(json))
        })
        .catch((error: any) => {
          dispatch(receiveOrdersError(error))
        })
    }
  }
}

export function bulkUpdate(dataToSet: any) {
  return (
    dispatch: (arg0: {
      (dispatch: any, getState: any): any
      type?: string
    }) => void,
    getState: () => any
  ) => {
    dispatch(requestBulkUpdate())
    const state = getState()
    const promises = state.orders.selected.map((orderId: any) =>
      api.orders.update(orderId, dataToSet)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(receiveBulkUpdate())
        dispatch(fetchOrders())
      })
      .catch(err => {
        dispatch(errorBilkUpdate())
        console.log(err)
      })
  }
}

export function deleteOrders() {
  return (
    dispatch: (arg0: {
      (dispatch: any, getState: any): any
      type?: string
    }) => void,
    getState: () => any
  ) => {
    const state = getState()
    const promises = state.orders.selected.map((orderId: any) =>
      api.orders.delete(orderId)
    )

    return Promise.all(promises)
      .then(values => {
        dispatch(deleteOrdersSuccess())
        dispatch(deselectAllOrder())
        dispatch(fetchOrders())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function deleteCurrentOrder() {
  return (dispatch: any, getState: () => any) => {
    const state = getState()
    const order = state.orders.editOrder

    if (order && order.id) {
      return api.orders.delete(order.id).catch((err: any) => {
        console.log(err)
      })
    }
  }
}

const fetchOrderAdditionalData = (order: {
  customer_id: string | any[]
  shipping_method_id: string | any[]
  items: any[]
  customer: any
  shipping_method_details: any
}) => {
  const hasCustomer = order.customer_id && order.customer_id.length > 0
  const hasShippingMethod =
    order.shipping_method_id && order.shipping_method_id.length > 0
  const productIds =
    order && order.items && order.items.length > 0
      ? order.items
          .filter((item: { product_id: any }) => item.product_id)
          .map((item: { product_id: any }) => item.product_id)
      : []
  const productFilter = {
    ids: productIds,
    fields: "images,enabled,stock_quantity,variants,options",
  }

  return Promise.all([
    productIds.length > 0 ? api.products.list(productFilter) : null,
    hasCustomer ? api.customers.retrieve(order.customer_id) : null,
    hasShippingMethod
      ? api.shippingMethods.retrieve(order.shipping_method_id)
      : null,
  ])
    .then(([productsResponse, customerResponse, methodResponse]) => {
      if (productsResponse) {
        const products = productsResponse.json.data
        const newItems = order.items.map(
          (item: { product: any; product_id: any }) => {
            item.product = products.find(
              (p: { id: any }) => p.id === item.product_id
            )
            return item
          }
        )
        order.items = newItems
      }
      order.customer = customerResponse ? customerResponse.json : null
      order.shipping_method_details = methodResponse
        ? methodResponse.json
        : null

      return order
    })
    .catch(err => err)
}

export function fetchOrder(orderId: any) {
  return (
    dispatch: (arg0: { type: string; item?: any }) => void,
    getState: any
  ) => {
    dispatch(requestOrder())

    return api.orders
      .retrieve(orderId)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
  }
}

export function deleteOrderItem(orderId: any, orderItemId: any) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: () => any
  ) => {
    const state = getState()

    api.orders.items
      .delete(orderId, orderItemId)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
  }
}

export function addOrderItem(orderId: any, productId: any) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: () => any
  ) => {
    const state = getState()

    api.orders.items
      .create(orderId, {
        product_id: productId,
        variant_id: null,
        quantity: 1,
      })
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
  }
}

export function updateOrderItem(
  orderId: any,
  orderItemId: any,
  quantity: any,
  variantId: any
) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: () => any
  ) => {
    const state = getState()

    api.orders.items
      .update(orderId, orderItemId, {
        quantity,
        variant_id: variantId,
      })
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
  }
}

export function updateOrder(data: {
  id: any
  hold?: boolean
  tracking_number?: any
  status_id?: any
  shipping_method_id?: any
  payment_method_id?: any
  comments?: any
  note?: any
  email?: any
  mobile?: any
}) {
  return (
    dispatch: (arg0: { type: string; item?: any; error?: any }) => void,
    getState: any
  ) => {
    dispatch(requestOrderUpdate())

    return api.orders
      .update(data.id, data)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrderUpdate())
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {
        dispatch(failOrderUpdate(error))
      })
  }
}

export function closeOrder(orderId: any) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: any
  ) =>
    api.orders
      .close(orderId)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
}

export function cancelOrder(orderId: any) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: any
  ) =>
    api.orders
      .cancel(orderId)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
}

export function updateShippingAddress(orderId: any, address: any) {
  return (
    dispatch: (arg0: { type: string; item: any }) => void,
    getState: any
  ) =>
    api.orders
      .updateShippingAddress(orderId, address)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {})
}

export function createOrder(history: string[]) {
  return (dispatch: (arg0: { type: string }) => void, getState: () => any) => {
    const state = getState()
    return api.orders
      .create({ draft: true, referrer_url: "admin" })
      .then((orderResponse: { json: { id: any } }) => {
        const orderId = orderResponse.json.id
        dispatch(createOrdersSuccess())
        history.push(`/order/${orderId}`)
      })
      .catch((error: any) => {})
  }
}

export function checkoutOrder(orderId: any) {
  return (
    dispatch: (arg0: { type: string; item?: any; error?: any }) => void,
    getState: any
  ) => {
    dispatch(requestOrderCheckout())
    return api.orders
      .checkout(orderId)
      .then((orderResponse: { json: any }) => orderResponse.json)
      .then(fetchOrderAdditionalData)
      .then((order: any) => {
        dispatch(receiveOrderCheckout())
        dispatch(receiveOrder(order))
      })
      .catch((error: any) => {
        dispatch(failOrderCheckout(error))
      })
  }
}
