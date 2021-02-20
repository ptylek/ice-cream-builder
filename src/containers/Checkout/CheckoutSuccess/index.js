import React from 'react';
import { Grid, Header, Icon, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const CheckoutSuccess = (props) => {
	const orders = useSelector(state => state.order.orders);
	const lastOrder = orders[Object.keys(orders)[Object.keys(orders).length - 1]];
	const orderNo = lastOrder.id;

	return (
		<>
			<Grid columns='one'>
				<Grid.Row verticalAlign='middle' style={{padding: '2rem'}}>
					<Grid.Column textAlign='center'>
						<Header as='h2' icon>
							<Icon name='checkmark' color='green' />
							Thank you for your order!
							<Header.Subheader>
								{orderNo ? 'Your order no.: ' + orderNo : <Loader/>}
							</Header.Subheader>
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
};

export default CheckoutSuccess;