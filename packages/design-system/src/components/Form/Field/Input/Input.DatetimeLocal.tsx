import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputDatetimeLocalProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const DatetimeLocal = forwardRef((props: InputDatetimeLocalProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="datetime-local" ref={ref} />;
});

DatetimeLocal.displayName = 'DatetimeLocal';

export default DatetimeLocal;
