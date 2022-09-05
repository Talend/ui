import React, { forwardRef, Ref } from 'react';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../../WIP/FormPrimitives/index';

export type InputFieldProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles'>;

export type TypedInputFieldProps = Omit<InputFieldProps, 'type'>;

const Field = forwardRef((props: InputFieldProps, ref: Ref<HTMLInputElement>) => {
	const {
		label,
		hasError = false,
		link,
		description,
		id,
		name,
		hideLabel,
		type,
		required,
		...rest
	} = props;
	return (
		<FieldPrimitive
			label={label}
			hasError={hasError || false}
			link={link}
			description={description}
			id={id}
			name={name}
			hideLabel={hideLabel}
			required={required}
		>
			<InputPrimitive {...rest} type={type} ref={ref} />
		</FieldPrimitive>
	);
});

Field.displayName = 'Field';

export default Field;
