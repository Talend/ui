import React from 'react';
import Field, { FieldProps } from '../Field';

export type InputProps = FieldProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Field {...props} as="input" ref={ref} />;
});

export default Input;
