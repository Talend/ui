import React, { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Week = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="week" ref={ref} />;
});

Week.displayName = 'Week';

export default Week;
