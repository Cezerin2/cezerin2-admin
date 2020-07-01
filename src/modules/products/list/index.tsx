import { connect } from "react-redux"
import { withRouter } from "react-router"
import {
  deselectAllProduct,
  deselectProduct,
  fetchMoreProducts,
  fetchProducts,
  selectAllProduct,
  selectProduct,
} from "../actions"
import List from "./components/list"

const mapStateToProps = (state: any) => ({
  settings: state.settings.settings,
  items: state.products.items,
  selected: state.products.selected,
  loadingItems: state.products.loadingItems,
  hasMore: state.products.hasMore,
  totalCount: state.products.totalCount,
})

const mapDispatchToProps = (dispatch: Function) => ({
  onLoad: () => {
    dispatch(fetchProducts())
  },
  onSelect: event => {
    const productId = event.target.value
    const { checked } = event.target

    if (checked) {
      dispatch(selectProduct(productId))
    } else {
      dispatch(deselectProduct(productId))
    }
  },
  onSelectAll: event => {
    const { checked } = event.target

    if (checked) {
      dispatch(selectAllProduct())
    } else {
      dispatch(deselectAllProduct())
    }
  },
  loadMore: () => {
    dispatch(fetchMoreProducts())
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))
