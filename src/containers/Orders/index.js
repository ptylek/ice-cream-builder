import React, { useState, useEffect } from 'react';
import { Item, Grid } from 'semantic-ui-react';
import Order from 'components/Order';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		instance.get('orders.json')
			.then(response => {
				const fetchedOrders = [];

				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key
					});
				}

				setOrders(fetchedOrders);
			})
			.catch(error => {
				setLoading(false);
				if (error) {

				}
			})
	}, []);

	return (
		<>
			<Grid columns='one'>
				<Grid.Row verticalAlign='middle' style={{padding: '2rem'}}>
					<Grid.Column>
						<Item.Group>
							{orders.map(order => {
								return <Order key={order.id} id={order.id} ingredients={order.ingredients} price={order.price} customer={order.customer}/>
							})}
						</Item.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
}

export default errorHandler(Orders, instance);