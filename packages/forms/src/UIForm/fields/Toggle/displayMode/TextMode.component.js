import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Toggle from '@talend/react-components/lib/Toggle';

export default function TextModeToggle(props) {
	return (
		<div className={classNames('form-group', props.className)}>
			<dt>
				<label htmlFor={props.id} className="control-label">
					<Toggle
						checked={props.value}
						disabled
						id={props.id}
						label={props.schema.title}
						// eslint-disable-next-line jsx-a11y/aria-proptypes
						aria-hidden
					/>
				</label>
			</dt>
			<dd id={props.id} className="sr-only">
				{String(props.value)}
			</dd>
		</div>
	);
}

TextModeToggle.defaultProps = {
	value: false,
};

if (process.env.NODE_ENV !== 'production') {
	TextModeToggle.propTypes = {
		className: PropTypes.string,
		description: PropTypes.string,
		descriptionId: PropTypes.string,
		errorId: PropTypes.string,
		errorMessage: PropTypes.string,
		value: PropTypes.bool,
		isValid: PropTypes.bool,
		id: PropTypes.string,
		schema: PropTypes.shape({
			required: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
