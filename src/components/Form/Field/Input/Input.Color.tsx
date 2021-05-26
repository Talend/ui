import React from 'react';
import Input, { InputProps } from './Input';

const Color = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="color" ref={ref} />;
});

export default Color;
