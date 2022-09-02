import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputNumberProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Number = forwardRef((props: InputNumberProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="number" ref={ref} />;
});

Number.displayName = 'Number';

export default Number;
