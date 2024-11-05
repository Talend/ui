import { forwardRef, Ref } from 'react';

import { useId } from '../../../../useId';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	TextareaPrimitive,
	TextareaPrimitiveProps,
} from '../../Primitives';

export type InputTextareaProps = FieldPropsPrimitive &
	Omit<TextareaPrimitiveProps, 'className' | 'styles'> & { children?: string };

const Textarea = forwardRef((props: InputTextareaProps, ref: Ref<HTMLTextAreaElement>) => {
	const {
		label,
		hasError = false,
		link,
		description,
		id,
		name,
		hideLabel,
		required,
		defaultValue,
		children,
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
			fieldId={fieldID}
			name={name}
			hideLabel={hideLabel}
			required={required}
		>
			<TextareaPrimitive
				defaultValue={defaultValue || children}
				{...rest}
				required={required}
				id={fieldID}
				name={name}
				ref={ref}
				hasError={hasError || false}
			/>
		</FieldPrimitive>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
