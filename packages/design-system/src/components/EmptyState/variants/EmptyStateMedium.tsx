import React, { forwardRef, Ref } from 'react';
import EmptyStatePrimitive, { EmptyStatePrimitiveProps } from '../primitive/EmptyStatePrimitive';

import IconDefault from '../illustrations/IconDefault';

type EmptyStateLargeProps = Omit<EmptyStatePrimitiveProps, 'illustration'> & {
	callback?: never;
};

const EmptyStateMedium = forwardRef((props: EmptyStateLargeProps, ref: Ref<HTMLElement>) => {
	return <EmptyStatePrimitive {...props} illustration={<IconDefault />} ref={ref} />;
});

export default EmptyStateMedium;
