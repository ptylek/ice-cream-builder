import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Item, Grid, Loader } from 'semantic-ui-react';
import Order from 'components/Order';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';
import * as actions from 'store/actions';

const Orders = (props) => {
	useEffect(() => {
		props.onFetchOrders();
	}, []);

	let orders = <Loader>Loading...</Loader>;

	if (!props.loading) {
		orders =props.orders.map(order => (
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
							{orders}
						</Item.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
}

Orders.propTypes = {
	orders: PropTypes.array,
	loading: PropTypes.bool,
	onFetchOrders: PropTypes.func
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, instance));