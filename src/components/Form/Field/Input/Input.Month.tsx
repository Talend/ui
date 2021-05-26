import React from 'react';
import Input, { InputProps } from './Input';

const Month = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="month" ref={ref} />;
});

export default Month;
