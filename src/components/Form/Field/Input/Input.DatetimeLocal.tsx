import React from 'react';
import Input, { InputProps } from './Input';

const DatetimeLocal = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return <Input {...props} type="datetime-local" ref={ref} />;
});

export default DatetimeLocal;
