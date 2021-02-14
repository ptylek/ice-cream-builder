import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const QtySwitcher = (props) => {
	return (
		<>
			<Button icon
				onClick={props.minus} 
				disabled={props.disabled}>
				<Icon name='minus' />
			</Button>
			<Button icon onClick={props.plus}>
				<Icon name='plus' />
			</Button>
		</>
	)
};

QtySwitcher.propTypes = {
	plus: PropTypes.func,
	minus: PropTypes.func,
	disabled: PropTypes.bool
}

export default QtySwitcher;
