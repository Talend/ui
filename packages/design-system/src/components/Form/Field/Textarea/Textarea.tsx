import React, { forwardRef, Ref } from 'react';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	TextareaPrimitive,
	TextareaPrimitiveProps,
} from '../../../WIP/FormPrimitives/index';

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
			<TextareaPrimitive defaultValue={defaultValue || children} {...rest} ref={ref} />
		</FieldPrimitive>
	);
});

Textarea.displayName = 'Textarea';

export default Textarea;
