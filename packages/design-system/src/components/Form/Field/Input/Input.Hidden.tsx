import React from 'react';
import Input, { InputProps } from './Input';

const Hidden = React.forwardRef((props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	return <Input {...props} type="hidden" ref={ref} />;
});

export default Hidden;
