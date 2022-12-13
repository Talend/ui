import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeTagProps = Omit<
	BadgePrimitiveProps,
	'isDropdown' | 'isReadOnly' | 'semanticIcon' | 'value' | 'valueLayout' | 'withOperator'
>;

const BadgeTag = forwardRef((props: BadgeTagProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<BadgePrimitive
			{...props}
			isDropdown={false}
			isReadOnly={true}
			ref={ref}
			semanticIcon={'none'}
			value={undefined}
			valueLayout={'off'}
			withOperator={false}
		/>
	);
});

BadgeTag.displayName = 'BadgeTag';

export default BadgeTag;
