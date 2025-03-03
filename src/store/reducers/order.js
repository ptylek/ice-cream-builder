import * as actionTypes from 'store/actions/actionTypes';
import updateObject from 'utility/update-object';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHECKOUT_INIT:
			return updateObject(state, {
				purchased: false
			});
		case actionTypes.PURCHASE_START:
			return updateObject(state, {
				loading: true
			});
		case actionTypes.PURCHASE_SUCCESS:
			const newOrder = updateObject(action.orderData, {
				id: action.orderId,
			});

			return updateObject(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			});
		case actionTypes.PURCHASE_FAIL:
			return updateObject(state, {
				loading: false
			});
		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, {
				loading: true
			});
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObject(state, {
				orders: action.orders,
				loading: false
			});
		case actionTypes.FETCH_ORDERS_FAILED:
			return updateObject(state, {
				loading: false
			});
		default:
			return state;
	}
}

export default reducer;