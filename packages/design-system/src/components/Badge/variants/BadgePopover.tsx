import React, { forwardRef, Ref } from 'react';

import Divider from '../../Divider';
import { StackHorizontal } from '../../Stack';
import BadgeButton from '../button/BadgeButton';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = BadgePrimitiveProps & {
	value: BadgePopoverItem[];
};

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			{
				<StackHorizontal gap="XXS" as="span" align="center">
					{value.map((item: BadgePopoverItem, idx: number) => (
						<React.Fragment key={`badgepopover-fragment-${item.id}`}>
							{idx > 0 && (
								<Divider key={`badgepopover-divider-${item.id}`} orientation="vertical" />
							)}

							<BadgeButton componentId={`badgepopover-button-${item.id}`} onClick={item.onClick}>
								{item.label}
							</BadgeButton>
						</React.Fragment>
					))}
				</StackHorizontal>
			}
		</BadgePrimitive>
	);
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
