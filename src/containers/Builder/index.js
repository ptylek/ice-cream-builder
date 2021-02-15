import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Controls from 'components/Controls';
import Preview from 'components/Preview';
import { Grid, Loader } from 'semantic-ui-react';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';
import INGREDIENT_PRICES from 'constants/ingredient-prices';
import routes from 'routes';

const Builder = (props) => {
	const [ingredients, setIngredients] = useState(null);
	const [error, setError] = useState(false);
	const [price, setPrice] = useState(4);
	const [purchasable, setPurchasable] = useState(false);
	const [purchasing, setPurchasing] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		instance.get('ingredients.json')
			.then(response => {
				setIngredients(response.data)
			})
			.catch(error =>{
				setError(true);
			});
	}, []);

	useEffect(() => {
		if (ingredients) {
			const copyIngredients = {...ingredients};
			const sum = Object.values(copyIngredients)
				.reduce((amount, acc) => {
					return acc += amount;
				});

			setPurchasable(sum > 0);
		}
	});

	const purchaseHandler = (val) => {
		setPurchasing(val);
	}

	const toCheckoutHandler = () => {
		const queryParams = [];

		_.forEach(ingredients, (value, key) => {
			queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		});

		queryParams.push('price=' + price);

		const queryString = queryParams.join('&');

		props.history.push({
			pathname: routes.CHECKOUT,
			search: '?' + queryString
		});
	};

	const addIngredient = (type) => {
		const oldCount = ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...ingredients};

		updatedIngredients[type] = updatedCount;

		setIngredients(updatedIngredients);

		const priceAddition = INGREDIENT_PRICES[type];
		const newPrice = price + priceAddition;

		setPrice(newPrice);
	}

	const removeIngredient = (type) => {
		const oldCount = ingredients[type];

		if (oldCount <= 0) {
			return;
		}

		const updatedCount = oldCount - 1;
		const updatedIngredients = {...ingredients};

		updatedIngredients[type] = updatedCount;

		setIngredients(updatedIngredients);

		const priceDeduction = INGREDIENT_PRICES[type];
		const newPrice = price - priceDeduction;

		setPrice(newPrice);
	}

	let disabledData = {
		...ingredients
	}

	_.forEach(disabledData, (value, key) => {
		disabledData[key] = value <= 0;
	});

	let builder = error ? 'Ingredients cannot be loaded' : <Loader size='large' active inline='centered'>Loading</Loader>	

	if (ingredients) {
		builder = (
			<>
				<Grid.Column>
					<Controls
						ingredientAdded={addIngredient}
						ingredientRemoved={removeIngredient}
						disabledControls={disabledData}
						totalPrice={price}
						purchasable={purchasable}
						ordered={purchaseHandler}
						purchasing={purchasing}
						ingredients={ingredients}
						toCheckout={toCheckoutHandler}
						loading={loading}
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