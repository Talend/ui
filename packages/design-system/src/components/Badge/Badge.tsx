import React, { forwardRef, Ref } from 'react';
import { BadgeVariantType } from './primitive/BadgePrimitive';
import BadgeDropdown, { BadgeDropdownProps } from './variants/BadgeDropdown';
import BadgePopover, { BadgePopoverProps } from './variants/BadgePopover';
import BadgeTag, { BadgeTagProps } from './variants/BadgeTag';
import BadgeValue, { BadgeValueProps } from './variants/BadgeValue';

type BadgeValueType = BadgeVariantType<'badge', BadgeValueProps>;
type BadgeTagType = BadgeVariantType<'tag', BadgeTagProps>;
type BadgeDropdownType = BadgeVariantType<'dropdown', BadgeDropdownProps>;
type BadgePopoverType = BadgeVariantType<'popover', BadgePopoverProps>;

type BadgeType = BadgeValueType | BadgeTagType | BadgeDropdownType | BadgePopoverType;

const Badge = forwardRef((props: BadgeType, ref: Ref<HTMLSpanElement>) => {
	switch (props.variant) {
		case 'badge': {
			const { variant, ...rest } = props;
			return <BadgeValue {...rest} ref={ref} />;
		}

		case 'tag': {
			const { variant, ...rest } = props;
			return <BadgeTag {...rest} ref={ref} />;
		}

		case 'dropdown': {
			const { variant, ...rest } = props;
			return <BadgeDropdown {...rest} ref={ref} />;
		}

		case 'popover': {
			const { variant, ...rest } = props;
			return <BadgePopover {...rest} ref={ref} />;
		}
	}
});

Badge.displayName = 'Badge';

export default Badge;
