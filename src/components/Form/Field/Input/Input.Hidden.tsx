import React from 'react';
import Input, { InputProps } from './Input';

const Hidden = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="hidden" ref={ref} />;
});

export default Hidden;
