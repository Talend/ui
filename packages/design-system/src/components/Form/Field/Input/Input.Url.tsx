import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Url = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="url" ref={ref} />;
});

Url.displayName = 'Url';

export default Url;
