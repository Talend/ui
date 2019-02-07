/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { isUpdating } from '../../utils/updating';

export default function SimpleCheckBox({
	describedby,
	id,
	isValid,
	label,
	onChange,
	onFinish,
	schema,
	value,
	updating,
	disabled,
}) {
	const { autoFocus } = schema;
	const updatingValue = isUpdating(updating, schema);
	const disabledValue = schema.disabled || disabled || updatingValue;
	return (
		<div className={classnames('checkbox', { disabled: disabledValue })}>
			<label>
				<input
					id={id}
					autoFocus={autoFocus}
					disabled={disabledValue}
					onChange={event => {
						onChange(event, { schema, value: event.target.checked });
						onFinish(event, { schema, value: event.target.checked });
					}}
					type="checkbox"
					checked={value}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-describedby={describedby}
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
		updating: PropTypes.bool,
		disabled: PropTypes.bool,
		describedby: PropTypes.string.isRequired,
		id: PropTypes.string,
		isValid: PropTypes.bool,
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
