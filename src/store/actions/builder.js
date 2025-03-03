import * as actionTypes from './actionTypes';
import instance from 'services/orders';

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT, 
		ingredientName: name
	}
}

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT, 
		ingredientName: name
	}
}

// sync
export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}

// async
export const initIngredients = () => {
	return dispatch => {
		instance.get('ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data));
			})
			.catch(error =>{
				dispatch(fetchIngredientsFailed());
			});
	}
}