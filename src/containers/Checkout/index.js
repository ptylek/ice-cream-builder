import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CheckoutSummary from 'components/CheckoutSummary';
import CheckoutData from 'containers/Checkout/CheckoutData';
import routes from 'routes';

const Checkout = (props) => {
	const checkoutCancelHandler = () => {
		props.history.goBack();
	}

	const checkoutContinueHandler = () => {
		props.history.replace(routes.CHECKOUT_CONTACT)
	}

	let summary = <Redirect to={routes.BUILDER}/>

	if (props.ingredients) {
		const checkoutRedirect = props.purchased ? <Redirect to={routes.BUILDER}/> : null;

		summary = (
			<>
				{checkoutRedirect}
				<CheckoutSummary ingredients={props.ingredients}
					checkoutCancel={checkoutCancelHandler}
					checkoutContinue={checkoutContinueHandler}/>
				<Route path={routes.CHECKOUT_CONTACT} component={CheckoutData}/>
			</>
		)
	}

	return summary;
};

Checkout.propTypes = {
	history: PropTypes.object,
	location: PropTypes.any,
	ingredients: PropTypes.object,
	onCheckoutInit: PropTypes.func,
	purchased: PropTypes.bool
}

const mapStateToProps = state => {
	return {
		ingredients: state.builder.ingredients,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout);