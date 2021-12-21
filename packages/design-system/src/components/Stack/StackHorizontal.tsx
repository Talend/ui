import React from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

type StackHorizontalProps = Omit<StackPrimitiveProps, 'direction'>;

export const StackHorizontal = React.forwardRef(
	(props: StackHorizontalProps, ref: React.Ref<any>) => {
		return (
			<StackPrimitive {...props} direction="row" ref={ref}>
				{props.children}
			</StackPrimitive>
		);
	},
);
