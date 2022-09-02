import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputColorProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Color = forwardRef((props: InputColorProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="color" ref={ref} />;
});

Color.displayName = 'Color';

export default Color;
