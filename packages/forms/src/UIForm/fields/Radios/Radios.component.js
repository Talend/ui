/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import { extractDataAttributes } from '../../utils/properties';
import FieldTemplate from '../FieldTemplate';

export default function Radios({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
}) {
	const { autoFocus, description, disabled = false, inline, title, labelProps, ...rest } = schema;

	return (
		<FieldTemplate
			id={id}
			label={title}
			labelProps={labelProps}
			hint={schema.hint}
			required={schema.required}
			isValid={isValid}
			description={description}
			errorMessage={errorMessage}
			valueIsUpdating={valueIsUpdating}
			inline={inline}
		>
			{schema.titleMap &&
				schema.titleMap.map((option, index) => (
					<Form.Radio
						key={option.value || option.name}
						id={`${id}-${index}`}
						autoFocus={autoFocus}
						checked={option.value === value}
						disabled={disabled || valueIsUpdating}
						name={id}
						onBlur={event => onFinish(event, { schema })}
						onChange={event => onChange(event, { schema, value: option.value })}
						value={option.value}
						label={option.name}
						aria-invalid={!isValid}
						{...extractDataAttributes(rest, index)}
					/>
				))}
		</FieldTemplate>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Radios.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

Radios.defaultProps = {
	isValid: true,
	schema: {},
};
