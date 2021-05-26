import React from 'react';
import Input, { InputProps } from './Input';

const Email = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="email" ref={ref} />;
});

export default Email;
