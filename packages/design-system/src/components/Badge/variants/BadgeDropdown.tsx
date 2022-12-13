import React, { forwardRef, Ref } from 'react';
import { DropdownItemType } from '../../Dropdown/Dropdown';
import BadgePrimitive, { BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgeDropdownProps = Omit<
	BadgePrimitiveProps,
	'isDropdown' | 'value' | 'valueLayout'
> & { value: DropdownItemType[] };

const BadgeDropdown = forwardRef((props: BadgeDropdownProps, ref: Ref<HTMLSpanElement>) => {
	return <BadgePrimitive {...props} isDropdown={true} ref={ref} valueLayout={'single'} />;
});

BadgeDropdown.displayName = 'BadgeDropdown';

export default BadgeDropdown;
