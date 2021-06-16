import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import SingleButton from './SingleButton.component';

import theme from './Buttons.scss';

function getButtonsList(id, buttons, onTrigger, onClick, getComponent) {
	if (!buttons) {
		return null;
	}
	return buttons.map((itemSchema, index) => (
		<SingleButton
			className={classNames(theme[itemSchema.position], itemSchema.className)}
			key={index}
			id={itemSchema.id || `${id}-${index}`}
			onTrigger={onTrigger}
			onClick={onClick && onClick(itemSchema.onClick)}
			schema={itemSchema}
			getComponent={getComponent}
		/>
	));
}

export default function Buttons({ id, onTrigger, className, schema, onClick, getComponent }) {
	return (
		<div className={classNames(theme['tf-buttons'], 'tf-buttons', className)}>
			{getButtonsList(id, schema.items, onTrigger, onClick, getComponent)}
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
		getComponent: PropTypes.func,
	};
}

Buttons.defaultProps = {
	schema: {},
};
