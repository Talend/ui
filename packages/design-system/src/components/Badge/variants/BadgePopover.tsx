import React, { forwardRef, Ref } from 'react';
import { DropdownItemType } from '../../Dropdown/Dropdown';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = Omit<
	BadgePrimitiveProps,
	'isDropdown' | 'value' | 'valueLayout'
> & { value: DropdownItemType[] };

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	return <BadgePrimitive {...props} isDropdown={true} ref={ref} valueLayout={'multi'} />;
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
