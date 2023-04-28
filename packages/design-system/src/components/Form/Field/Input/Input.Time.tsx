import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Time = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="time" ref={ref} />;
});

Time.displayName = 'Time';

export default Time;
