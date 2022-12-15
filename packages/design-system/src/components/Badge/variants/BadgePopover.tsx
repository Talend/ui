import React, { forwardRef, Ref } from 'react';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = Omit<BadgePrimitiveProps, 'withDivider'> & {
	value: BadgePopoverItem[];
};

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	return <BadgePrimitive {...props} ref={ref} withDivider />;
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
