import * as actionTypes from 'store/actions/actionTypes';
import INGREDIENT_PRICES from 'constants/ingredient-prices';
import updateObject from 'utility/update-object';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	fetchIngredientsError: false
}

const addIngredient = (state, action) => {
	const updatedIngredientsAdd = updateObject(state.ingredients, {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	});

	const updatedStateAdd = {
		ingredients: updatedIngredientsAdd,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
	}

	return updateObject(state, updatedStateAdd);
}

const removeIngredient = (state, action) => {
	const updatedIngredientsRemove = updateObject(state.ingredients, {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	});

	const updatedStateRemove = {
		ingredients: updatedIngredientsRemove,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
	}

	return updateObject(state, updatedStateRemove);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return updateObject(state, {
				ingredients: action.ingredients,
				fetchIngredientsError: false,
				totalPrice: 4
			});
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, {
				fetchIngredientsError: true
			});
		default:
			return state;
	}
}

export default reducer;