import React from 'react';
import classes from 'components/Preview/Scoop/styles.module.css'
import PropTypes from 'prop-types';

const Scoop = (props) => {
	let scoop = null;

	if (props.type) {
		scoop = <div className={`${classes.scoop} ${classes[props.type]}`}></div>
	}

	return scoop;
}

Scoop.propTypes = {
	type: PropTypes.string.isRequired
}

export default Scoop;