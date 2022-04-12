import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

export type EmptyStateSmallProps = Omit<
	EmptyStatePrimitiveProps,
	'illustration' | 'description' | 'docLinkURL'
> & {
	callback?: never;
};

const EmptyStateSmall = forwardRef((props: EmptyStateSmallProps, ref: Ref<HTMLElement>) => {
	return <EmptyStatePrimitive {...props} ref={ref} />;
});

export default EmptyStateSmall;
