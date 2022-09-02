import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputTimeProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Time = forwardRef((props: InputTimeProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="time" ref={ref} />;
});

Time.displayName = 'Time';

export default Time;
