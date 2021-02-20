import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Item, Grid, Loader } from 'semantic-ui-react';
import Order from 'components/Order';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';
import * as actions from 'store/actions';

const Orders = (props) => {
	const orders = useSelector(state => state.order.orders);
	const loading = useSelector(state => state.order.loading);
	const token = useSelector(state => state.auth.token);
	const userId = useSelector(state => state.auth.userId);

	const dispatch = useDispatch();
	const onFetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [token, userId]);

	useEffect(() => {
		onFetchOrders(token, userId);
	}, [onFetchOrders, token, userId]);

	let ordersView = <Loader>Loading...</Loader>;

	if (!loading) {
		ordersView =orders.map(order => (
			<Order key={order.id} 
				   id={order.id} 
				   ingredients={order.ingredients} 
				   price={order.price} 
				   customer={order.customer}/>
		));
	}
	return (
		<>
			<Grid columns='one'>
				<Grid.Row verticalAlign='middle' style={{padding: '2rem'}}>
					<Grid.Column>
						<Item.Group>
							{ordersView}
						</Item.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
}

export default errorHandler(Orders, instance);