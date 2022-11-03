import React, { forwardRef, Ref } from 'react';
import Input, { TypedInputFieldProps } from './Input';

const Color = forwardRef((props: TypedInputFieldProps, ref: Ref<HTMLInputElement>) => {
	return <Input {...props} type="color" ref={ref} />;
});

Color.displayName = 'Color';

export default Color;
