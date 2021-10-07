import React from 'react';
import Input, { InputProps } from './Input';

const DatetimeLocal = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="datetime-local" ref={ref} />;
});

export default DatetimeLocal;
