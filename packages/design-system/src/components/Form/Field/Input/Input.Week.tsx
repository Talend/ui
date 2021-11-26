import React from 'react';
import Input, { InputProps } from './Input';

const Week = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="week" ref={ref} />;
});

export default Week;
