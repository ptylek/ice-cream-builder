import React, { useEffect } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Icon } from 'semantic-ui-react'
import Builder from 'containers/Builder';
import Checkout from 'containers/Checkout';
import CheckoutSuccess from 'containers/Checkout/CheckoutSuccess';
import Orders from 'containers/Orders';
import Auth from 'containers/Auth';
import Logout from 'containers/Auth/Logout';
import routes from 'routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from 'store/actions';

const App = (props) => {
	useEffect(() => {
		props.onTryAutoSignUp();
	}, []);

	let appRoutes = (
		<Switch>
			<Route path={routes.AUTH} component={Auth}/>
			<Route path={routes.BUILDER} component={Builder}/>
			<Redirect to={routes.BUILDER} />
		</Switch>
	);

	if (props.isAuthenticated) {
		appRoutes = (
			<Switch>
				<Route path={routes.CHECKOUT_SUCCESS} render={props => <CheckoutSuccess {...props}/>}/>
				<Route path={routes.CHECKOUT} component={Checkout}/>
				<Route path={routes.ORDERS} component={Orders}/>
				<Route path={routes.AUTH} component={Auth}/>
				<Route path={routes.LOGOUT} component={Logout}/>
				<Route path={routes.BUILDER} component={Builder}/>
				<Redirect to={routes.BUILDER} />
			</Switch>
		)
	}

	return (
		<>
			<Menu stackable>
				<Menu.Item>
					<Icon name='snowflake' style={{fontSize: '2rem'}}/> Snowflake
				</Menu.Item>
				<Menu.Item
					as={NavLink}
					to={routes.BUILDER}
					exact
				>
					<Icon name='cogs'/> Builder
				</Menu.Item>
				{!props.isAuthenticated ? (
					<Menu.Item
						as={NavLink}
						to={routes.AUTH}
					>
						<Icon name='list alternate outline'/> Account
					</Menu.Item>
				) : (
					<Menu.Item
						as={NavLink}
						to={routes.LOGOUT}
					>
						<Icon name='log out'/> Logout
					</Menu.Item> 
				)}
				{props.isAuthenticated ? (
					<Menu.Item
						as={NavLink}
						to={routes.ORDERS}
					>
						<Icon name='list alternate outline'/> Orders
					</Menu.Item>
				) : null}
			</Menu>
			{appRoutes}
		</>
	);
}

App.propTypes = {
	isAuthenticated: PropTypes.bool,
	onTryAutoSignUp: PropTypes.func
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheck())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
