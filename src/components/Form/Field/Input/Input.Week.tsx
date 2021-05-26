import React from 'react';
import Input, { InputProps } from './Input';

const Week = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="week" ref={ref} />;
});

export default Week;
