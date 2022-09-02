import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputDateProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Date = forwardRef((props: InputDateProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="date" ref={ref} />;
});

Date.displayName = 'Date';

export default Date;
