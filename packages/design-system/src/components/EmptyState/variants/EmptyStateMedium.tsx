import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

import IconDefault from '../illustrations/IconDefault';

export type EmptyStateMediumProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	callback?: never;
	description: string;
};

const EmptyStateMedium = forwardRef((props: EmptyStateMediumProps, ref: Ref<HTMLElement>) => {
	return <EmptyStatePrimitive {...props} illustration={<IconDefault />} ref={ref} />;
});

export default EmptyStateMedium;
