import React from 'react';
import Input, { InputProps } from './Input';

const Color = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="color" ref={ref} />;
});

export default Color;
