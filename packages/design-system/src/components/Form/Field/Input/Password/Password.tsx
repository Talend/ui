import React, { forwardRef, Ref } from 'react';
import { FieldPropsPrimitive, InputPrimitiveProps } from '../../../Primitives/index';
import Input from '../Input';

type InputPasswordProps = FieldPropsPrimitive &
	Omit<InputPrimitiveProps, 'className' | 'styles' | 'type'>;

const Password = forwardRef((props: InputPasswordProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="password" ref={ref} />;
});

Password.displayName = 'Password';

export default Password;
