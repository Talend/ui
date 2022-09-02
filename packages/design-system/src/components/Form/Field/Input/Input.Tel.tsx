import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputTelProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Tel = forwardRef((props: InputTelProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="tel" ref={ref} />;
});

Tel.displayName = 'Tel';

export default Tel;
