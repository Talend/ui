import React from 'react';
import Input, { InputProps } from './Input';

const Tel = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="tel" ref={ref} />;
});

export default Tel;
