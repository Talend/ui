import { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

import SpotDefault from '../illustrations/SpotDefault';

export type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	description: string;
};

const EmptyStateLarge = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return (
		<EmptyStatePrimitive aria-live="polite" {...props} illustration={<SpotDefault />} ref={ref} />
	);
});

export default EmptyStateLarge;
