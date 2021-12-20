import React from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export const StackHorizontal = React.forwardRef(
	(props: Omit<StackPrimitiveProps, 'direction'>, ref: React.Ref<any>) => {
		return (
			<StackPrimitive {...props} direction="row" ref={ref}>
				{props.children}
			</StackPrimitive>
		);
	},
);
