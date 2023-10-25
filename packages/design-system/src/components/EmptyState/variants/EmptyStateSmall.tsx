import { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

export type EmptyStateSmallProps = Omit<
	EmptyStatePrimitiveProps,
	'illustration' | 'description' | 'link'
> & {
	action?: never;
};

const EmptyStateSmall = forwardRef((props: EmptyStateSmallProps, ref: Ref<HTMLElement>) => {
	return <EmptyStatePrimitive {...props} ref={ref} />;
});

EmptyStateSmall.displayName = 'EmptyStateSmall';
export default EmptyStateSmall;
