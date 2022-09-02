import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputHiddenProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type' | 'required'>;

const Hidden = forwardRef((props: InputHiddenProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="hidden" ref={ref} />;
});

Hidden.displayName = 'Hidden';

export default Hidden;
