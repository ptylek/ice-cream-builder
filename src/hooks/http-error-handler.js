import { useState, useEffect } from 'react';

export default httpClient => {
	const [errorMsg, setErrorMsg] = useState(null);

	const requestInterceptor = httpClient.interceptors.request.use(
		req => {
			setErrorMsg(null);
			return req;
		}
	);

	const responseInterceptor = httpClient.interceptors.response.use(
		res => res,
		error => { 
			if (error) {
				setErrorMsg(error);
			}
		}
	);

	useEffect(() => {
		return () => {
			httpClient.interceptors.request.eject(requestInterceptor);
			httpClient.interceptors.response.eject(responseInterceptor);
		};
	}, [requestInterceptor, responseInterceptor]);

	const errorConfirmedHandler = () => {
		setErrorMsg(null);
	}

	return [errorMsg, errorConfirmedHandler];
}