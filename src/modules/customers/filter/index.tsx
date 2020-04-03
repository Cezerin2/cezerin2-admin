import { connect } from "react-redux";
import {
  fetchCustomers,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  setFilterSearch
} from "../actions";
import Filter from "./components/fields";

const mapStateToProps = state => ({
  active: state.products.filter_active,
  discontinued: state.products.filter_discontinued,
  on_sale: state.products.filter_on_sale,
  stock_status: state.products.filter_stock_status
});

const mapDispatchToProps = dispatch => ({
  setActive: value => {
    dispatch(setDefaultBillingAddress(value, ""));
    dispatch(fetchCustomers());
  },
  setDiscontinued: value => {
    dispatch(setDefaultShippingAddress(value, ""));
    dispatch(fetchCustomers());
  },
  setOnSale: value => {
    dispatch(setFilterSearch(value));
    dispatch(fetchCustomers());
  },
  setStock: value => {
    dispatch(setFilterSearch(value));
    dispatch(fetchCustomers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
