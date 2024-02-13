/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
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
	const descriptionId = generateDescriptionId(id);
	const errorId = generateErrorId(id);

	return (
		<FieldTemplate
			id={id}
			hint={schema.hint}
			description={description}
			descriptionId={descriptionId}
			errorId={errorId}
			errorMessage={errorMessage}
			isValid={isValid}
			label={title}
			labelProps={labelProps}
			required={schema.required}
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
						aria-describedby={`${descriptionId} ${errorId}`}
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
		schema: PropTypes.shape({
			className: PropTypes.string,
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			inline: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			labelProps: PropTypes.object,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
			hint: PropTypes.shape({
				icon: PropTypes.string,
				className: PropTypes.string,
				overlayComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
				overlayPlacement: PropTypes.string,
			}),
		}),
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		valueIsUpdating: PropTypes.bool,
	};
}

Radios.defaultProps = {
	isValid: true,
	schema: {},
};
