import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import * as actions from 'store/actions';
import { Redirect }  from 'react-router-dom';
import routes from 'routes';
import checkRules from 'utility/check-rules';

const Auth = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formValidationHelper, setFormValidationHelper] = useState({
		email: null,
		password: null
	});
	const [formIsValid, setFormIsValid] = useState(false);
	const [isRegister, setIsRegister] = useState(true);

	useEffect(() => {
		let validationCheck = true;

		for (let value in formValidationHelper) {
			if (!formValidationHelper[value]) {
				validationCheck = false;
			}
		}

		setFormIsValid(validationCheck)
	}, [formValidationHelper]);

	const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(email, password, isRegister);
    }

	const switchAuthHandler = (event) => {
		event.preventDefault();
		setIsRegister(!isRegister);
	}

	let form = (
		<Form size='small'>
			<Form.Field>
				<label>Email Address</label>
				<input name='email' type='email' value={email} required onChange={(e) => {
					checkRules(e.target, formValidationHelper, setFormValidationHelper);
					setEmail(e.target.value);
				}} placeholder='Email Address' />
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<input name='password' type='password' required minLength={7} value={password} onChange={(e) => {
						checkRules(e.target, formValidationHelper, setFormValidationHelper);
						setPassword(e.target.value);
					}} placeholder='Password' />
			</Form.Field>
			<Button positive type='submit' disabled={!formIsValid} onClick={submitHandler}>{isRegister ? 'Register' : 'Login'}</Button>
			<Button onClick={switchAuthHandler}>Switch to {isRegister ? 'Login' : 'Register'}</Button>
		</Form>
	)

	if (props.loading) {
		form = <Loader active/>
	}

	let errorMessage = null;

	if (props.error) {
		errorMessage = <p style={{marginTop: '2rem'}}>Error: {props.error}</p>
	}

	let authRedirect = null;

	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.building ? routes.CHECKOUT : routes.BUILDER}/>
	}

	return (
		<>
			<Grid columns='one'>
				<Grid.Row style={{padding: '2rem'}}>
					<Grid.Column>
						<Header as='h2'>
							<Icon name={isRegister ? 'user circle outline' : 'user circle'}/>
							<Header.Content>{isRegister ? 'Register' : 'Login'}</Header.Content>
						</Header>
						{authRedirect}
						{form}
						{errorMessage}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	)
};

Auth.propTypes = {
	onAuth: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.string,
	isAuthenticated: PropTypes.bool,
	building: PropTypes.bool
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		building: state.builder.building
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);