import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputMonthProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Month = forwardRef((props: InputMonthProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="month" ref={ref} />;
});

Month.displayName = 'Month';

export default Month;
