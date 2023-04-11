import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const DatetimeLocal = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="datetime-local" ref={ref} />;
});

DatetimeLocal.displayName = 'DatetimeLocal';

export default DatetimeLocal;
