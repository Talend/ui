import React from 'react';
import Input, { InputProps } from './Input';

const Text = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="text" ref={ref} />;
});

export default Text;
