import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SingleButton from './SingleButton.component';

import theme from './Buttons.scss';

function getButtonsList(id, buttons, onTrigger) {
	if (!buttons) {
		return null;
	}
	return buttons.map((itemSchema, index) => (
		<SingleButton
			className={theme[itemSchema.position]}
			key={index}
			id={itemSchema.id || `${id}-${index}`}
			onTrigger={onTrigger}
			schema={itemSchema}
		/>
	));
}

export default function Buttons({ id, onTrigger, className, schema }) {
	return (
		<div className={classNames(theme['tf-buttons'], 'tf-buttons', className)}>
			{getButtonsList(id, schema.items, onTrigger)}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Buttons.propTypes = {
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: SingleButton.propTypes.schema,
		className: PropTypes.string,
	};
}

Buttons.defaultProps = {
	schema: {},
};
