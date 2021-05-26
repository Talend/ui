import React from 'react';
import Input, { InputProps } from './Input';

const Time = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="time" ref={ref} />;
});

export default Time;
