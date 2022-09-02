import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputTextProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Text = forwardRef((props: InputTextProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="text" ref={ref} />;
});

Text.displayName = 'Text';

export default Text;
