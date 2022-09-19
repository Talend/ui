import React, { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Month = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="month" ref={ref} />;
});

Month.displayName = 'Month';

export default Month;
