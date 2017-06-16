import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Message from '../../Message';

function FieldTemplate(props) {
	const groupsClassNames = classNames(
		'form-group',
		{ 'has-error': !props.isValid },
	);

	return (
		<div className={groupsClassNames}>
			{
				props.labelBefore &&
				<label htmlFor={props.id} className="control-label">{props.labelBefore}</label>
			}
			{props.children}
			{
				props.labelAfter &&
				<label htmlFor={props.id} className="control-label">{props.labelAfter}</label>
			}
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
		children: PropTypes.element,
		description: PropTypes.element,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		labelAfter: PropTypes.string,
		labelBefore: PropTypes.string,
	};
}

export default FieldTemplate;
