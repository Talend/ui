import PropTypes from 'prop-types';
import React from 'react';

export default function SimpleCheckBox({ id, label, onChange, onFinish, schema, value }) {
	const { autoFocus, disabled = false } = schema;

	return (
		<div className="checkbox">
			<label>
				<input
					id={id}
					autoFocus={autoFocus}
					disabled={disabled}
					label={label}
					onChange={event => {
						onChange(event, { schema, value: event.target.checked });
						onFinish(event, { schema, value: event.target.checked });
					}}
					type="checkbox"
					checked={value}
				/>
				<span className="control-label" htmlFor={id}>{label}</span>
			</label>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SimpleCheckBox.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			disabled: PropTypes.bool,
		}),
		value: PropTypes.bool,
	};
}

SimpleCheckBox.defaultProps = {
	schema: {},
	value: false,
};
