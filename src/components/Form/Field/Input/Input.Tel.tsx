import React from 'react';
import Input, { InputProps } from './Input';

const Tel = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="tel" ref={ref} />;
});

export default Tel;
