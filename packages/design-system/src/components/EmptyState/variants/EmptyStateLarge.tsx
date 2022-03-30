import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

import SpotDefault from '../illustrations/SpotDefault';

type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	description: string;
};

const EmptyStateLarge = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return (
		<EmptyStatePrimitive {...props} aria-live="polite" illustration={<SpotDefault />} ref={ref} />
	);
});

export default EmptyStateLarge;
