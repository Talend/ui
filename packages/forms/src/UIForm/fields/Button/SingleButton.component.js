import PropTypes from 'prop-types';
import React from 'react';
import { Action } from '@talend/react-components';
import classNames from 'classnames';

export default function SingleButton({ className, id, onTrigger, schema }) {
	const {
		style,
		disabled = false,
		inProgress,
		label,
		name,
		triggers,
		type = 'button',
	} = schema;

	let onClick;
	if (type === 'button' && triggers) {
		onClick = event => onTrigger(event, { trigger: triggers[0], schema });
	}

	return (
		<Action
			id={id}
			bsStyle={style}
			className={classNames('btn', className)}
			disabled={disabled}
			inProgress={inProgress}
			label={label}
			name={name}
			onClick={onClick}
			type={type}
		/>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SingleButton.propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			bsStyle: PropTypes.string,
			disabled: PropTypes.bool,
			inProgress: PropTypes.bool,
			name: PropTypes.string,
			label: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.string),
			type: PropTypes.string,
		}),
	};
}

SingleButton.defaultProps = {
	schema: {},
};
