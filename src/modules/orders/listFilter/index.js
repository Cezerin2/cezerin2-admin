import { connect } from 'react-redux';
import { fetchOrders, setFilter } from '../actions';
import Filter from './components/fields';

const mapStateToProps = state => ({
	settings: state.settings.settings,
	dateCreatedFrom: state.orders.filter.date_placed_min,
	dateCreatedTo: state.orders.filter.date_placed_max,
	isClosed: state.orders.filter.closed,
	isCancelled: state.orders.filter.cancelled,
	isDelivered: state.orders.filter.delivered,
	isPaid: state.orders.filter.paid,
	isHold: state.orders.filter.hold,
	isDraft: state.orders.filter.draft
});

const mapDispatchToProps = dispatch => ({
	setDateCreatedFrom: value => {
		dispatch(setFilter({ date_placed_min: value.format() }));
		dispatch(fetchOrders());
	},
	setDateCreatedTo: value => {
		dispatch(setFilter({ date_placed_max: value.format() }));
		dispatch(fetchOrders());
	},
	setCancelled: value => {
		dispatch(setFilter({ cancelled: value }));
		dispatch(fetchOrders());
	},
	setDelivered: value => {
		dispatch(setFilter({ delivered: value }));
		dispatch(fetchOrders());
	},
	setPaid: value => {
		dispatch(setFilter({ paid: value }));
		dispatch(fetchOrders());
	},
	setHold: value => {
		dispatch(setFilter({ hold: value }));
		dispatch(fetchOrders());
	},
	setDraft: value => {
		dispatch(setFilter({ draft: value }));
		dispatch(fetchOrders());
	},
	setClosed: value => {
		dispatch(setFilter({ closed: value }));
		dispatch(fetchOrders());
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter);
