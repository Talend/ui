import React from 'react';
import Input, { InputProps } from './Input';

const Time = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="time" ref={ref} />;
});

export default Time;
