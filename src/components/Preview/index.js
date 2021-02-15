import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Scoop from 'components/Preview/Scoop';
import classes from 'components/Preview/styles.module.css';

const Preview = (props) => {
	const flavours = _.flatten(Object.keys(props.ingredients)
		.map(flavour => {
			return [...Array(props.ingredients[flavour])].map((_, i) => {
				return <Scoop key={flavour + i} type={flavour}/>
			});
		}));

	const noFlavourMessage = flavours.length === 0 ? 'Please select a flavour!' : null;

	return (
		<div className={classes.preview}>
			{noFlavourMessage}
			<div className={classes.scoops}>
				{flavours}
			</div>
			<div className={classes.cone}></div>
		</div>
	)
}

Preview.propTypes = {
	ingredients: PropTypes.object.isRequired
}

export default Preview;