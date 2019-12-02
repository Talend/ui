import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Message from '../Message';
import theme from './FieldTemplate.scss';

function Label(props) {
	return (
		<label htmlFor={props.id} className="control-label">
			{props.label}
		</label>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Label.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
	};
}

function FieldTemplate(props) {
	const groupsClassNames = classNames('form-group', theme.template, {
		'has-error': props.error,
		[theme.inProgress]: props.inProgress,
	});

	return (
		<div className={groupsClassNames} aria-busy={props.inProgress}>
			{props.label && <Label id={props.id} label={props.label} />}
			{props.children}
			<Message
				description={props.description}
				descriptionId={props.descriptionId}
				error={props.error}
				errorId={props.errorId}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		description: PropTypes.string,
		descriptionId: PropTypes.string.isRequired,
		error: PropTypes.string,
		errorId: PropTypes.string.isRequired,
		id: PropTypes.string,
		label: PropTypes.string,
		inProgress: PropTypes.bool,
	};
}

FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
