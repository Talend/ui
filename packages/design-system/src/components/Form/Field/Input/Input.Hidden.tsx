import { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

type InputHiddenProps = Omit<TypedInputFieldProps, 'required'>;

const Hidden = forwardRef((props: InputHiddenProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="hidden" ref={ref} />;
});

Hidden.displayName = 'Hidden';

export default Hidden;
