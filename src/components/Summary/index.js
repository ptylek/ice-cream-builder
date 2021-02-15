import React from 'react';
import PropTypes from 'prop-types';
import { Header, List } from 'semantic-ui-react';

const Summary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(igKey => {
			if (props.ingredients[igKey] > 0) {
				return (
					<List.Item key={igKey}>
						<strong style={{textTransform: 'capitalize'}}>{igKey}</strong>: {props.ingredients[igKey]}
					</List.Item>
				)
			}
		})

	return (
		<>
			<Header>Your order</Header>
			<p>A delicious ice cream with the following scoops:</p>
			<List>
				{ingredientSummary}
			</List>
			<p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
		</>
	)	
}

Summary.propTypes = {
	ingredients: PropTypes.object,
	price: PropTypes.number
}

export default Summary;