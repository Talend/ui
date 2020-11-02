import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './FieldTemplate.scss';

function FieldTemplate(props) {
	const groupsClassNames = classNames('form-group', {
		'has-error': props.error,
		[theme.inProgress]: props.inProgress,
        required: props.required,
	});

	return (
		<div className={groupsClassNames} aria-busy={props.inProgress}>
			<label htmlFor={props.id} className="control-label">
				{props.label}
			</label>

			{props.children}

			<div>
				<p
					id={props.descriptionId}
					className={classNames('help-block', { 'sr-only': props.error })}
				>
					{props.description}
				</p>
				<p id={props.errorId} className="help-block" role="status" aria-live="assertive">
					{props.error}
				</p>
			</div>
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
		required: PropTypes.bool,
	};
}

FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
