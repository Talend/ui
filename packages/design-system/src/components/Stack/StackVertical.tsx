import React from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export const StackVertical = React.forwardRef(
	(props: Omit<StackPrimitiveProps, 'direction'>, ref: React.Ref<any>) => {
		return (
			<StackPrimitive {...props} direction="column" ref={ref}>
				{props.children}
			</StackPrimitive>
		);
	},
);
