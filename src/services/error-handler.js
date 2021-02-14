import React, {useEffect, useState} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const errorHandler = (WrappedComponent, axios) => {
  const withErrorHandlerComponent = props => {
    const [errorMsg, setErrorMsg] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(
		req => {
			setErrorMsg(null);
			return req;
		}
	);

    const responseInterceptor = axios.interceptors.response.use(
		res => res,
		error => { 
			if (error) {
				setErrorMsg(error);
			}
		}
	);

    useEffect(() => {
		return () => {
			axios.interceptors.request.eject(requestInterceptor);
			axios.interceptors.response.eject(responseInterceptor);
		};
	}, [requestInterceptor, responseInterceptor]);

	return (
		<>
			<Modal
				basic
				open={errorMsg !== null}
				size='small'
			>
				<Header icon>
					<Icon name='warning sign' />
					Something went wrong!
				</Header>
				<Modal.Content>
					<p>
						{errorMsg !== null ? errorMsg : null}
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button basic color='green' inverted onClick={() => setErrorMsg(null)}>
						<Icon name='checkmark' /> Try Again
					</Button>
				</Modal.Actions>
			</Modal>
			<WrappedComponent {...props}/>
	   	 </>
		)
	};
  	
	return withErrorHandlerComponent;
};

export default errorHandler;