import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import * as actions from 'store/actions';
import routes from 'routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Logout = (props) => {
	useEffect(() => {
		props.onLogout();
	}, []);

	return <Redirect to={routes.BUILDER}/>
}

Logout.propTypes = {
	onLogout: PropTypes.func
}

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(Logout);