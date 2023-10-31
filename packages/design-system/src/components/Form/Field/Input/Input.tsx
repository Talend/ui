import { forwardRef, Ref } from 'react';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../Primitives';
import { useId } from '../../../../useId';

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

	const fieldID = useId(id, 'field-');

	return (
		<FieldPrimitive
			label={label}
			hasError={hasError || false}
			link={link}
			description={description}
			id={id}
			hideLabel={hideLabel}
			fieldId={fieldID}
			name={name}
			required={required}
		>
			<InputPrimitive
				{...rest}
				id={fieldID}
				type={type}
				ref={ref}
				hasError={hasError || false}
				name={name}
				required={required}
			/>
		</FieldPrimitive>
	);
});

Field.displayName = 'Field';

export default Field;
