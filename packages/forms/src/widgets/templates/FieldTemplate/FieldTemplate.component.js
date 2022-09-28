import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InlineMessageInformation, InlineMessageDestructive } from '@talend/design-system';

import theme from './FieldTemplate.module.scss';

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
					<div className={classNames({ 'sr-only': props.error })}>
						<InlineMessageInformation
							id={props.descriptionId}
							description={props.description}
							role={undefined}
							aria-live={undefined}
							data-test="fieldTemplate.inlineMessage"
						/>
					</div>
				)}
				{props.error && (
					<InlineMessageDestructive
						id={props.errorId}
						description={props.error}
						aria-live="assertive"
						data-test="fieldTemplate.inlineMessageError"
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
