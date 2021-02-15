import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Loader } from 'semantic-ui-react';

const CheckoutSuccess = (props) => {
	const [orderNo, setOrderNo] = useState('');

	useEffect(() => {
		const query = new URLSearchParams(props.location.search);
		let orderNo = '';

		for (let param of query.entries()) {
			orderNo = param[1];
		}

		setOrderNo(orderNo);
	}, []);

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

CheckoutSuccess.propTypes = {
	location: PropTypes.object
}

export default CheckoutSuccess;