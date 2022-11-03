import React, { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Tel = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="tel" ref={ref} />;
});

Tel.displayName = 'Tel';

export default Tel;
