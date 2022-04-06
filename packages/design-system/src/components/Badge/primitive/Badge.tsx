import React, { forwardRef, Ref } from 'react';

import BadgeBase, { BadgeProps } from './BadgePrimitive';

type RemovableBadgeProps = BadgeProps & {
	onRemove: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

const Badge = forwardRef(({ label, onRemove }: RemovableBadgeProps, ref: Ref<HTMLSpanElement>) => {
	return <BadgeBase label={label} onRemove={onRemove} ref={ref} />;
});

export default Badge;
