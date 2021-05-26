import React from 'react';
import Input, { InputProps } from './Input';

const Date = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="date" ref={ref} />;
});

export default Date;
