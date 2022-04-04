import React, { forwardRef } from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export type StackHorizontalProps = Omit<StackPrimitiveProps, 'direction'>;

export const StackHorizontal = forwardRef((props: StackHorizontalProps, ref: React.Ref<any>) => {
	return (
		<StackPrimitive {...props} direction="row" ref={ref}>
			{props.children}
		</StackPrimitive>
	);
});
