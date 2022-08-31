import React, { forwardRef, Ref } from 'react';
import {
	FieldPrimitive,
	FieldPropsPrimitive,
	InputPrimitive,
	InputPrimitiveProps,
} from '../../../WIP/FormPrimitives/index';

type InputColorProps = FieldPropsPrimitive & Omit<InputPrimitiveProps, 'className' | 'styles'>;

const Color = forwardRef((props: InputColorProps, ref: Ref<HTMLInputElement>) => {
	const { label, hasError = false, link, description, id, name, hideLabel, ...rest } = props;
	return (
		<FieldPrimitive
			label={label}
			hasError={hasError || false}
			link={link}
			description={description}
			id={id}
			name={name}
			hideLabel={hideLabel}
		>
			<InputPrimitive {...rest} type="color" ref={ref} />
		</FieldPrimitive>
	);
});

Color.displayName = 'Color';

export default Color;
