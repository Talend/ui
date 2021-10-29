import React from 'react';
import Field, { FieldProps } from '../Field';

export type InputProps = FieldProps & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Field {...props} as="input" ref={ref} />;
});

export default Input;
