import React, { forwardRef, Ref } from 'react';

import BadgeBase, { BadgeProps } from '../primitive/BadgePrimitive';

type BadgeSimpleProps = Pick<BadgeProps, 'label' | 'onRemove'>;

const Badge = forwardRef(({ label, onRemove }: BadgeSimpleProps, ref: Ref<HTMLSpanElement>) => {
	const badgeProps = { label, onRemove };
	return <BadgeBase {...badgeProps} ref={ref} />;
});

export default Badge;
