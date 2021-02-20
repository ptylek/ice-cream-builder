import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	
	const ingredients = useSelector(state => state.builder.ingredients);
	const totalPrice = useSelector(state => state.builder.totalPrice);
	const fetchIngredientsError = useSelector(state => state.builder.fetchIngredientsError);
	const isAuthenticated = useSelector(state => state.auth.token !== null);

	const dispatch = useDispatch();
	const onIngredientAdded = useCallback(ingName => dispatch(actions.addIngredient(ingName)), []);
	const onIngredientRemoved = useCallback(ingName => dispatch(actions.removeIngredient(ingName)), []);
	const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
	const onCheckoutInit = useCallback(() => dispatch(actions.checkoutInit()), []);

	useEffect (() => {
		onInitIngredients();
	}, [onInitIngredients])

	useEffect(() => {
		if (ingredients) {
			const copyIngredients = {...ingredients};
			const sum = Object.values(copyIngredients)
				.reduce((amount, acc) => {
					return acc += amount;
				});

			setPurchasable(sum > 0);
		}
	}, [ingredients]);

	const toCheckoutHandler = () => {
		onCheckoutInit();
		props.history.push(routes.CHECKOUT);
	};

	const redirectToAuth = () => {	
		props.history.push(routes.AUTH);
	}

	let disabledData = {
		...ingredients
	}

	_.forEach(disabledData, (value, key) => {
		disabledData[key] = value <= 0;
	});

	let builder = fetchIngredientsError ? 'Ingredients cannot be loaded' : <Loader size='large' active inline='centered'>Loading</Loader>	

	if (ingredients) {
		builder = (
			<>
				<Grid.Column>
					<Controls
						ingredientAdded={onIngredientAdded}
						ingredientRemoved={onIngredientRemoved}
						disabledControls={disabledData}
						totalPrice={totalPrice}
						purchasable={purchasable}
						ordered={setPurchasing}
						purchasing={purchasing}
						ingredients={ingredients}
						toCheckout={toCheckoutHandler}
						isAuthenticated={isAuthenticated}
						redirectToAuth={redirectToAuth}
					/>
				</Grid.Column>
				<Grid.Column textAlign='center'>
					<Preview ingredients={ingredients}/>
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
	history: PropTypes.object
}

export default errorHandler(Builder, instance);