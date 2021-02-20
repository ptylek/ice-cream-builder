import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckoutSummary from 'components/CheckoutSummary';
import CheckoutData from 'containers/Checkout/CheckoutData';
import routes from 'routes';

const Checkout = (props) => {
	const ingredients = useSelector(state => state.builder.ingredients);
	const purchased = useSelector(state => state.order.purchased);

	const checkoutCancelHandler = () => {
		props.history.goBack();
	}

	const checkoutContinueHandler = () => {
		props.history.replace(routes.CHECKOUT_CONTACT)
	}

	let summary = <Redirect to={routes.BUILDER}/>

	if (ingredients) {
		const checkoutRedirect = purchased ? <Redirect to={routes.CHECKOUT_SUCCESS}/> : null;

		summary = (
			<>
				{checkoutRedirect}
				<CheckoutSummary ingredients={ingredients}
					checkoutCancel={checkoutCancelHandler}
					checkoutContinue={checkoutContinueHandler}/>
				<Route path={routes.CHECKOUT_CONTACT} component={CheckoutData}/>
			</>
		)
	}

	return summary;
};

Checkout.propTypes = {
	history: PropTypes.object
}

export default Checkout;