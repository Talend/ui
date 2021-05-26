import React from 'react';
import Input, { InputProps } from './Input';

const Url = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="url" ref={ref} />;
});

export default Url;
