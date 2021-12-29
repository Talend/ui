import React from 'react';
import Input, { InputProps } from './Input';

const Text = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="text" ref={ref} />;
});

export default Text;
