import React from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export type StackVerticalProps = Omit<StackPrimitiveProps, 'direction'>;

export const StackVertical = React.forwardRef((props: StackVerticalProps, ref: React.Ref<any>) => {
	return (
		<StackPrimitive {...props} direction="column" ref={ref}>
			{props.children}
		</StackPrimitive>
	);
});
