import { forwardRef } from 'react';
import type { Ref } from 'react';
import StackPrimitive, { StackPrimitiveProps } from './Primitive/StackPrimitive';

export type StackHorizontalProps = Omit<StackPrimitiveProps, 'direction' | 'height'>;

export const StackHorizontal = forwardRef((props: StackHorizontalProps, ref: Ref<any>) => {
	return (
		<StackPrimitive {...props} direction="row" ref={ref}>
			{props.children}
		</StackPrimitive>
	);
});

StackHorizontal.displayName = 'StackHorizontal';
