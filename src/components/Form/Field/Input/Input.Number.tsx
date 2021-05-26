import React from 'react';
import Input, { InputProps } from './Input';

const Number = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="number" ref={ref} />;
});

export default Number;
