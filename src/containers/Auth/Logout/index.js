import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom'
import * as actions from 'store/actions';
import routes from 'routes';
import { useDispatch } from 'react-redux';

const Logout = (props) => {
	const dispatch = useDispatch();
	const onLogout = useCallback(() => dispatch(actions.logout(), []));

	useEffect(() => {
		onLogout();
	}, [onLogout]);

	return <Redirect to={routes.BUILDER}/>
}

export default Logout;