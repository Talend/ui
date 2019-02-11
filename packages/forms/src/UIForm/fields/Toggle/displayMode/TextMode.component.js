import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Toggle from '@talend/react-components/lib/Toggle';

export default function TextModeToggle(props) {
	return (
		<div className={classNames('form-group', props.className)}>
			<dt>
				<label htmlFor={props.id} className="control-label sr-only">
					{props.schema.title}
				</label>
				<div aria-hidden>
					<Toggle checked={props.value} disabled label={props.schema.title} />
				</div>
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
		value: PropTypes.bool.required,
		id: PropTypes.string.required,
		schema: PropTypes.shape({
			required: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
