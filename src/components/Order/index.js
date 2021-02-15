import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

const Order = (props) => {
	const ingredients = [];

	for (let ingredientName in  props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ig => {
		if (ig.amount > 0) {
			return <span key={ig.name} style={{textTransform: 'capitalize'}}>{ig.name}: {ig.amount}</span>;
		}
	});

	return (
		<>
			<Item>
				<Item.Content>
					<Item.Header>Order no.: {props.id}</Item.Header>
					<Item.Meta>Price: {props.price.toFixed(2)}$</Item.Meta>
					<Item.Description style={{display: 'flex', flexDirection: 'column'}}>
						{ingredientOutput}
					</Item.Description>
					<Item.Extra style={{display: 'flex', flexDirection: 'column'}}>
						<span>Name: {props.customer.name}</span>
						<span>Email Address: {props.customer.email}</span>
						<span>Address: {props.customer.address.street} {props.customer.address.postcode}</span>
					</Item.Extra>
				</Item.Content>
			</Item>
		</>
	)
}

Order.propTypes = {
	price: PropTypes.any,
	ingredients: PropTypes.object,
	id: PropTypes.string,
	customer: PropTypes.object
}

export default Order;