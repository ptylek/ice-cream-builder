import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Grid, Loader, Dimmer } from 'semantic-ui-react';
import instance from 'services/orders';
import errorHandler from 'services/error-handler';
import * as actions from 'store/actions';
import checkRules from 'utility/check-rules';

const CheckoutData = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState({
		street: '',
		postcode: ''
	});
	const [formValidationHelper, setFormValidationHelper] = useState({
		name: null,
		email: null,
		street: null,
		postcode: null
	});
	const [formIsValid, setFormIsValid] = useState(false);

	const ingredients = useSelector(state => state.builder.ingredients);
	const totalPrice = useSelector(state => state.builder.totalPrice);
	const loading = useSelector(state => state.order.loading);
	const token = useSelector(state => state.auth.token);
	const userId = useSelector(state => state.auth.userId);

	const dispatch = useDispatch();
	const onPurchase = useCallback((orderData, token) => dispatch(actions.purchase(orderData, token)), []);

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

		const order = {
			ingredients: ingredients,
			price: totalPrice,
			customer: {
				name: name,
				address: {
					street: address.street,
					postcode: address.postcode,
				},
				email: email
			},
			userId: userId
		};

		onPurchase(order, token);
	}

	let form = (
		<Form size='small'>
			<Form.Group widths={2}>
				<Form.Field>
					<label>Name</label>
					<input name='name' value={name} required maxLength={20} onChange={(e) => {
						checkRules(e.target, formValidationHelper, setFormValidationHelper);
						setName(e.target.value);
					}} placeholder='Your name' />
				</Form.Field>
				<Form.Field>
					<label>Email Address</label>
					<input name='email' type='email' required value={email} onChange={(e) => {
							checkRules(e.target, formValidationHelper, setFormValidationHelper);
							setEmail(e.target.value);
						}} placeholder='Email Address' />
				</Form.Field>
			</Form.Group>
			<Form.Group widths={2}>
				<Form.Field>
					<label>Street</label>
					<input name='street' value={address.street} required onChange={(e) => {
						checkRules(e.target, formValidationHelper, setFormValidationHelper);
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
						checkRules(e.target, formValidationHelper, setFormValidationHelper);
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

export default errorHandler(CheckoutData, instance);

