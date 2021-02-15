import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Icon } from 'semantic-ui-react'
import Builder from 'containers/Builder';
import Checkout from 'containers/Checkout';
import CheckoutSuccess from 'containers/Checkout/CheckoutSuccess';
import Orders from 'containers/Orders';
import routes from 'routes';

const App = () => {
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
				<Menu.Item
					as={NavLink}
					to={routes.ORDERS}
				>
					<Icon name='list alternate outline'/> Orders
				</Menu.Item>
			</Menu>
			<Switch>
				<Route path={routes.CHECKOUT_SUCCESS} render={props => <CheckoutSuccess {...props}/>}/>
				<Route path={routes.CHECKOUT} component={Checkout}/>
				<Route path={routes.ORDERS} component={Orders}/>
				<Route path={routes.BUILDER} component={Builder}/>
				<Route render={() => <Redirect to={routes.BUILDER} />} />
			</Switch>
		</>
	);
}

export default App;
