import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import useHttpErrorHandler from 'hooks/http-error-handler';

const errorHandler = (WrappedComponent, axios) => {
	const withErrorHandlerComponent = props => {
		const [error, clearError] = useHttpErrorHandler(axios);

		return (
			<>
				<Modal
					basic
					open={error !== null}
					size='small'
				>
					<Header icon>
						<Icon name='warning sign' />
						Something went wrong!
					</Header>
					<Modal.Content>
						{error !== null ? error.message : null}
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='green' inverted onClick={() => clearError()}>
							<Icon name='checkmark' /> Okay
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