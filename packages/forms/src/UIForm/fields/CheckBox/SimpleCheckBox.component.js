import PropTypes from 'prop-types';
import React from 'react';
import { generateDescribedBy } from '../../Message/generateId';

export default function SimpleCheckBox({ id, isValid, label, onChange, onFinish, schema, value }) {
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
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={schema.required}
					aria-describedby={generateDescribedBy(id)}
				/>
				<span className="control-label" htmlFor={id}>
					{label}
				</span>
			</label>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SimpleCheckBox.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.string,
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
