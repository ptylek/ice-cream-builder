import * as actionTypes from './actionTypes';
import instance from 'services/orders';

export const purchaseSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseFail = (error) => {
	return {
		type: actionTypes.PURCHASE_FAIL,
		purchaseError: error
	}
}

export const purchaseStart = () => {
	return {
		type: actionTypes.PURCHASE_START
	}
}

export const purchase = (orderData, token) => {
	return dispatch  => {
		dispatch(purchaseStart());

		instance.post('orders.json?auth=' + token, orderData)
			.then(response => {
				dispatch(purchaseSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseFail(error));
			});
	}
}

export const checkoutInit = () => {
	return {
		type: actionTypes.CHECKOUT_INIT
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFailed = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		fetchOrdersError: error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch  => {
		dispatch(fetchOrdersStart());
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

		instance.get('orders.json' + queryParams)
			.then(response => {
				const fetchedOrders = [];

				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key
					});
				}

				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(error => {
				dispatch(fetchOrdersFailed(error));
			})
	}
}