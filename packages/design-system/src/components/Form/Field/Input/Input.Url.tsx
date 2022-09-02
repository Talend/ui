import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../WIP/FormPrimitives/index';
import Input from './Input';

type InputUrlProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Url = forwardRef((props: InputUrlProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="url" ref={ref} />;
});

Url.displayName = 'Url';

export default Url;
