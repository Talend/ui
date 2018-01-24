import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SingleButton from './SingleButton.component';

import theme from './Buttons.scss';

function getButtonsList(id, buttons, onTrigger, onClick) {
	if (!buttons) {
		return null;
	}
	return buttons.map((itemSchema, index) => (
		<SingleButton
			className={theme[itemSchema.position]}
			key={index}
			id={itemSchema.id || `${id}-${index}`}
			onTrigger={onTrigger}
			onClick={onClick(itemSchema.onClick)}
			schema={itemSchema}
		/>
	));
}

export default function Buttons({ id, onTrigger, className, schema, onClick }) {
	return (
		<div className={classNames(theme['tf-buttons'], 'tf-buttons', className)}>
			{getButtonsList(id, schema.items, onTrigger, onClick)}
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Buttons.propTypes = {
		id: PropTypes.string,
		onClick: PropTypes.func,
		onTrigger: PropTypes.func,
		schema: SingleButton.propTypes.schema,
		className: PropTypes.string,
	};
}

Buttons.defaultProps = {
	schema: {},
};
