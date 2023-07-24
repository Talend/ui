import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Email = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="email" ref={ref} />;
});

Email.displayName = 'Email';

export default Email;
