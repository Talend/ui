/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classnames from 'classnames';
import { get } from 'lodash';

/*
	This is a copy of the SimpleCheckBox present in the form package.
	Wh have a dep cyclic redundancy problem, so for now we have hard copy the component here.
*/
export default function SimpleCheckBox({
	describedby,
	disabled,
	id,
	isValid,
	label,
	onChange,
	onFinish,
	schema,
	value,
}) {
	const [checked, setChecked] = useState(value);

	const { autoFocus } = schema;

	function getDataFeature() {
		const dataFeature = get(schema, 'data-feature');
		if (dataFeature) {
			return `${dataFeature}.${checked ? 'uncheck' : 'check'}`;
		}
		return undefined;
	}

	return (
		<div className={classnames('checkbox', { disabled })}>
			<label data-feature={getDataFeature()}>
				<input
					id={id}
					autoFocus={autoFocus}
					disabled={disabled}
					onChange={event => {
						const isChecked = event.target.checked;
						setChecked(isChecked);
						onChange(event, { schema, value: isChecked });
						onFinish(event, { schema, value: isChecked });
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
		describedby: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
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
