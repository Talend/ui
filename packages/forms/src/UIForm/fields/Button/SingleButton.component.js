import PropTypes from 'prop-types';
import React from 'react';
import Action from '@talend/react-components/lib/Actions/Action';
import classNames from 'classnames';

export default function SingleButton({ className, id, onTrigger, schema }) {
	const { bsStyle, disabled = false, inProgress, name, title, triggers, type = 'button' } = schema;

	let onClick;
	if (type === 'button' && triggers) {
		onClick = event => onTrigger(event, { trigger: triggers[0], schema });
	}

	return (
		<Action
			id={id}
			bsStyle={bsStyle}
			className={classNames('btn', className)}
			disabled={disabled}
			inProgress={inProgress}
			label={title}
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
			title: PropTypes.string,
			triggers: PropTypes.arrayOf(PropTypes.string),
			type: PropTypes.string,
		}),
	};
}

SingleButton.defaultProps = {
	schema: {},
};
