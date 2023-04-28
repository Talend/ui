import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Date = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="date" ref={ref} />;
});

Date.displayName = 'Date';

export default Date;
