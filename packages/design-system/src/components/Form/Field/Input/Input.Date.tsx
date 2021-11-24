import React from 'react';
import Input, { InputProps } from './Input';

const Date = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="date" ref={ref} />;
});

export default Date;
