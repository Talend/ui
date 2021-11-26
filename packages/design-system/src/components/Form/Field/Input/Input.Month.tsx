import React from 'react';
import Input, { InputProps } from './Input';

const Month = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="month" ref={ref} />;
});

export default Month;
