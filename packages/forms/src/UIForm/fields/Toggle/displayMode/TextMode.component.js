import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Toggle from '@talend/react-components/lib/Toggle';

const noop = () => {};

export default function TextModeToggle(props) {
	return (
		<div className={classNames('form-group', props.className)}>
			<dt>
				<label htmlFor={props.id} className="control-label sr-only">
					{props.schema.title}
				</label>
				<div aria-hidden>
					<Toggle
						id={`${props.id}-input`}
						checked={props.value}
						label={props.schema.title}
						onChange={noop}
						disabled
					/>
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
		value: PropTypes.bool.isRequired,
		id: PropTypes.string.isRequired,
		schema: PropTypes.shape({
			required: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			title: PropTypes.string,
		}),
	};
}
