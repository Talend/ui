import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputEmailProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Email = forwardRef((props: InputEmailProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="email" ref={ref} />;
});

Email.displayName = 'Email';

export default Email;
