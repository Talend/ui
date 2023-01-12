import React, { forwardRef, Ref } from 'react';

import Divider from '../../Divider';
import { StackHorizontal } from '../../Stack';
import BadgeButton from '../button/BadgeButton';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = BadgePrimitiveProps & {
	/**
	 * List of items displayed as buttons in Badge's right part.
	 */
	value: BadgePopoverItem[];
};

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	const { value } = props;

	return (
		<BadgePrimitive {...props} ref={ref}>
			{
				<StackHorizontal gap="XXS" as="span" align="center">
					{value.map((item: BadgePopoverItem, idx: number) => (
						<React.Fragment key={`badgepopover-fragment-${item.id}`}>
							{idx > 0 && (
								<Divider key={`badgepopover-divider-${item.id}`} orientation="vertical" />
							)}

							<BadgeButton
								componentId={`badgepopover-button-${item.id}`}
								onClick={item.onClick}
								data-testid={props['data-testid'] ? `${props['data-testid']}.${item.id}` : item.id}
								data-test={props['data-test'] ? `${props['data-test']}.${item.id}` : item.id}
							>
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
