import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration' | 'description'> & {
	callback?: never;
};

const EmptyStateSmall = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return <EmptyStatePrimitive {...props} ref={ref} />;
});

export default EmptyStateSmall;
