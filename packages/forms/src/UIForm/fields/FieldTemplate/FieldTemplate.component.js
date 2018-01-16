import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Message from '../../Message';
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
		'has-error': !props.isValid,
		required: props.required,
	});

	return (
		<div className={groupsClassNames}>
			{props.label && !props.labelAfter && <Label id={props.id} label={props.label} />}
			{props.children}
			{props.label && props.labelAfter && <Label id={props.id} label={props.label} />}
			<Message
				errorMessage={props.errorMessage}
				description={props.description}
				isValid={props.isValid}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		description: PropTypes.string,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		label: PropTypes.string,
		labelAfter: PropTypes.bool,
		required: PropTypes.bool,
	};
}

FieldTemplate.defaultProps = {
	isValid: true,
};
FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
