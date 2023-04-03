import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Number = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="number" ref={ref} />;
});

Number.displayName = 'Number';

export default Number;
