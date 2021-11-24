import React from 'react';
import Input, { InputProps } from './Input';

const Email = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="email" ref={ref} />;
});

export default Email;
