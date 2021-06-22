import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineMessage } from '@talend/react-components';

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
				{props.description && (
					<InlineMessage
						id={props.descriptionId}
						className={classNames({ 'sr-only': props.error })}
						description={props.description}
						small
					/>
				)}
				{props.error && (
					<InlineMessage
						id={props.errorId}
						type={InlineMessage.TYPES.ERROR}
						description={props.error}
						aria-live="assertive"
						small
					/>
				)}
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
