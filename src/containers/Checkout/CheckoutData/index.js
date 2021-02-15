import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Loader, Dimmer } from 'semantic-ui-react';
import instance from 'services/orders';
import routes from 'routes';
import classes from 'containers/Checkout/CheckoutData/styles.module.css';

const CheckoutData = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState({
		street: '',
		postcode: ''
	});
	const [loading, setLoading] = useState(false);
	const [formValidationHelper, setFormValidationHelper] = useState({
		name: null,
		email: null,
		street: null,
		postcode: null
	});
	const [formIsValid, setFormIsValid] = useState(false);

	useEffect(() => {
		let validationCheck = true;

		for (let value in formValidationHelper) {
			if (!formValidationHelper[value]) {
				validationCheck = false;
			}
		}

		setFormIsValid(validationCheck)
	}, [formValidationHelper]);

	const orderHandler = (event) => {
		event.preventDefault();

		setLoading(true);

		const order = {
			ingredients: props.ingredients,
			price: props.price,
			customer: {
				name: name,
				address: {
					street: address.street,
					postcode: address.postcode,
				},
				email: email
			}
		};

		instance.post('/orders.json', order)
			.then(responseData => {
				setLoading(false);

				const queryString = 'orderId=' + responseData?.data?.name;

				props.history.push({
					pathname: routes.CHECKOUT_SUCCESS,
					search: '?' + queryString 
				});
			})
			.catch(error => {
				setLoading(false);
			});
	}

	const checkRules = (target) => {
		let isValid = true;

		if (target.required) {
			isValid = target.value.trim() !== '' && isValid;
		}

		if (target.minLength !== -1) {
			isValid = target.value.length >= target.minLength && isValid;
		}

		if (target.maxLength !== -1) {
			isValid = target.value.length <= target.maxLength && isValid;
		}

		const invalidClass = 'error';
		const successClass = classes.success;
		const parent = target.parentElement;

		if (!isValid) {
			parent.classList.remove(successClass);

			if (!parent.classList.contains(invalidClass)) {
				parent.classList.add(invalidClass);
			}
		} else {
			if (parent.classList.contains(invalidClass)) {
				parent.classList.remove(invalidClass);
			}

			parent.classList.add(successClass);
		}

		const clonedHelper = {...formValidationHelper};

		clonedHelper[target.name] = isValid;

		setFormValidationHelper(clonedHelper);
	}

	let form = (
		<Form size='small'>
			<Form.Group widths={2}>
				<Form.Field>
					<label>Name</label>
					<input name='name' value={name} required maxLength={20} onChange={(e) => {
						checkRules(e.target);
						setName(e.target.value);
					}} placeholder='Your name' />
				</Form.Field>
				<Form.Field>
					<label>Email Address</label>
					<input name='email' type='email' required value={email} onChange={(e) => {
							checkRules(e.target);
							setEmail(e.target.value);
						}} placeholder='Email Address' />
				</Form.Field>
			</Form.Group>
			<Form.Group widths={2}>
				<Form.Field>
					<label>Street</label>
					<input name='street' value={address.street} required onChange={(e) => {
						checkRules(e.target);
						setAddress(prevData => {
							return {
								street: e.target.value,
								postcode: prevData.postcode
							}
						})
					}} placeholder='Street' />
				</Form.Field>
				<Form.Field>
					<label>Post Code</label>
					<input name='postcode' value={address.postcode} required maxLength={5} onChange={(e) => {
						checkRules(e.target);
						setAddress(prevData => {
							return {
								street: prevData.street,
								postcode: e.target.value,
							}
						})
					}} placeholder='Post Code' />
				</Form.Field>
			</Form.Group>
			<Button positive type='submit' disabled={!formIsValid} onClick={orderHandler}>Order</Button>
		</Form>
	)

	if (loading) {
		form = <Dimmer style={{height: '20rem'}} inverted active><Loader size='large' inverted inline='centered'>Sending your order...</Loader></Dimmer>
	}

	return (
		<>
			<Grid columns='one'>
				<Grid.Row style={{padding: '2rem'}}>
					<Grid.Column>
						{form}
					</Grid.Column>
				</Grid.Row>
			</Grid>
			
		</>
	)
}

CheckoutData.propTypes = {
	ingredients: PropTypes.object,
	price: PropTypes.number,
	history: PropTypes.any
}

export default CheckoutData;

