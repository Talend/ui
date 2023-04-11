import { forwardRef } from 'react';
import * as React from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export type StackVerticalProps = Omit<StackPrimitiveProps, 'direction' | 'isFullWidth'>;

export const StackVertical = forwardRef((props: StackVerticalProps, ref: React.Ref<any>) => {
	return (
		<StackPrimitive {...props} direction="column" ref={ref}>
			{props.children}
		</StackPrimitive>
	);
});

StackVertical.displayName = 'StackVertical';
