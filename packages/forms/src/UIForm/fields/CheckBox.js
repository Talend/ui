import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Message from '../Message';

export default function CheckBox(props) {
	const { id, isValid, errorMessage, onChange, schema, value } = props;
	const { autoFocus, description, disabled, title } = schema;

	const groupsClassNames = classNames(
		'form-group',
		'checkbox',
		{ 'has-error': !isValid },
	);
	return (
		<div className={groupsClassNames}>
			<label>
				<input
					id={id}
					autoFocus={autoFocus}
					disabled={disabled}
					label={title}
					onChange={event => onChange(event, schema, event.target.checked)}
					type="checkbox"
					checked={value}
				/>
				<span className="control-label" htmlFor={id}>{title}</span>
			</label>
			<Message
				errorMessage={errorMessage}
				description={description}
				isValid={isValid}
			/>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	CheckBox.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.bool,
	};
}
CheckBox.defaultProps = {
	isValid: true,
	value: false,
};
