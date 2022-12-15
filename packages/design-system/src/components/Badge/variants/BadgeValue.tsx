import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeValueProps = Omit<BadgePrimitiveProps, 'isReadOnly' | 'withDivider'> & {
	value: string;
};

const BadgeValue = forwardRef((props: BadgeValueProps, ref: Ref<HTMLSpanElement>) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props} isReadOnly ref={ref} withDivider>
			{value}
		</BadgePrimitive>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
