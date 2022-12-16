import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeTagProps = Omit<
	BadgePrimitiveProps,
	'isReadOnly' | 'semanticIcon' | 'withDivider' | 'withOperator'
>;

const BadgeTag = forwardRef((props: BadgeTagProps, ref: Ref<HTMLSpanElement>) => {
	return (
		<BadgePrimitive
			{...props}
			isReadOnly
			ref={ref}
			semanticIcon={'none'}
			withDivider={false}
			withOperator={false}
		/>
	);
});

BadgeTag.displayName = 'BadgeTag';

export default BadgeTag;
