import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckoutSummary from 'components/CheckoutSummary';
import CheckoutData from 'containers/Checkout/CheckoutData';
import routes from 'routes';

const Checkout = (props) => {
	const [ingredients, setIngredients] = useState({});
	const [price, setPrice] = useState(0);

	useEffect(() => {
		const query = new URLSearchParams(props.location.search);
		const ingredientsObject = {};
		let price = 0;

		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = parseFloat(param[1], 10);
			} else {
				ingredientsObject[param[0]] = parseInt(param[1], 10);
			}
		}

		setIngredients(ingredientsObject);
		setPrice(price);
	}, []);

	const checkoutCancelHandler = () => {
		props.history.goBack();
	}

	const checkoutContinueHandler = () => {
		props.history.replace(routes.CHECKOUT_CONTACT)
	}

	return (
		<>
			<CheckoutSummary ingredients={ingredients}
							 checkoutCancel={checkoutCancelHandler}
							 checkoutContinue={checkoutContinueHandler}/>
			<Route path={routes.CHECKOUT_CONTACT} render={(props) => (<CheckoutData ingredients={ingredients} price={price} {...props}/>)}/>
		</>
	)
};

Checkout.propTypes = {
	history: PropTypes.object,
	location: PropTypes.any
}

export default Checkout;