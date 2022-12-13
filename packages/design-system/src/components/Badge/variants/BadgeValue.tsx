import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeValueProps = Omit<
	BadgePrimitiveProps,
	'isDropdown' | 'isReadOnly' | 'value' | 'valueLayout'
> & { value: string };

const BadgeValue = forwardRef((props: BadgeValueProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<BadgePrimitive
			{...props}
			isDropdown={false}
			isReadOnly={true}
			ref={ref}
			valueLayout={'single'}
		/>
	);
});

BadgeValue.displayName = 'BadgeValue';

export default BadgeValue;
