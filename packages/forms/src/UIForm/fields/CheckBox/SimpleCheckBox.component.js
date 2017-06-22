import React, { PropTypes } from 'react';

export default function SimpleCheckBox({ id, label, onChange, schema, value }) {
	return (
		<label>
			<input
				id={id}
				autoFocus={schema.autoFocus}
				disabled={schema.disabled}
				label={label}
				onChange={event => onChange(event, schema, event.target.checked)}
				type="checkbox"
				checked={value}
			/>
			<span className="control-label" htmlFor={id}>{label}</span>
		</label>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SimpleCheckBox.propTypes = {
		id: PropTypes.string,
		label: PropTypes.string,
		onChange: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			disabled: PropTypes.bool,
		}),
		value: PropTypes.bool,
	};
}

SimpleCheckBox.defaultProps = {
	value: false,
};
