import React, { PropTypes } from 'react';

export default function SimpleCheckBox({ id, label, onChange, schema, value }) {
	return (
		<div className="checkbox">
			<label>
				<input
					id={id}
					autoFocus={schema.autoFocus}
					disabled={schema.disabled}
					label={label}
					onChange={event => onChange(event, { schema, value: event.target.checked })}
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
