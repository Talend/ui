import React, { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Text = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="text" ref={ref} />;
});

Text.displayName = 'Text';

export default Text;
