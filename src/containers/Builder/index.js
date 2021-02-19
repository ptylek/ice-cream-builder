import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Controls from 'components/Controls';
import Preview from 'components/Preview';
import { Grid, Loader } from 'semantic-ui-react';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';
import routes from 'routes';
import * as actions from 'store/actions';

const Builder = (props) => {
	const [purchasable, setPurchasable] = useState(false);
	const [purchasing, setPurchasing] = useState(false);

	useEffect (() => {
		props.onInitIngredients();
	}, [])

	useEffect(() => {
		if (props.ingredients) {
			const copyIngredients = {...props.ingredients};
			const sum = Object.values(copyIngredients)
				.reduce((amount, acc) => {
					return acc += amount;
				});

			setPurchasable(sum > 0);
		}
	}, [props.ingredients]);

	const toCheckoutHandler = () => {
		props.onCheckoutInit();
		props.history.push(routes.CHECKOUT);
	};

	const redirectToAuth = () => {	
		props.history.push(routes.AUTH);
	}

	let disabledData = {
		...props.ingredients
	}

	_.forEach(disabledData, (value, key) => {
		disabledData[key] = value <= 0;
	});

	let builder = props.fetchIngredientsError ? 'Ingredients cannot be loaded' : <Loader size='large' active inline='centered'>Loading</Loader>	

	if (props.ingredients) {
		builder = (
			<>
				<Grid.Column>
					<Controls
						ingredientAdded={props.onIngredientAdded}
						ingredientRemoved={props.onIngredientRemoved}
						disabledControls={disabledData}
						totalPrice={props.totalPrice}
						purchasable={purchasable}
						ordered={setPurchasing}
						purchasing={purchasing}
						ingredients={props.ingredients}
						toCheckout={toCheckoutHandler}
						isAuthenticated={props.isAuthenticated}
						redirectToAuth={redirectToAuth}
					/>
				</Grid.Column>
				<Grid.Column textAlign='center'>
					<Preview ingredients={props.ingredients}/>
				</Grid.Column>
			</>
		);
	}

	return (
		<>
			<Grid columns='two' stackable>
				<Grid.Row verticalAlign='middle' style={{padding: '2rem'}}>
					{builder}
				</Grid.Row>
			</Grid>
		</>
	)
}

Builder.propTypes = {
	history: PropTypes.object,
	ingredients: PropTypes.object,
	onIngredientAdded: PropTypes.func,
	onIngredientRemoved: PropTypes.func,
	totalPrice: PropTypes.number,
	fetchIngredientsError: PropTypes.bool,
	onInitIngredients: PropTypes.func,
	onCheckoutInit: PropTypes.func,
	isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => {
	return {
		ingredients: state.builder.ingredients,
		totalPrice: state.builder.totalPrice,
		fetchIngredientsError: state.builder.fetchIngredientsError,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => {
			dispatch(actions.addIngredient(ingName));
		},
		onIngredientRemoved: ingName => {
			dispatch(actions.removeIngredient(ingName));
		},
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onCheckoutInit: () => dispatch(actions.checkoutInit())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Builder, instance));