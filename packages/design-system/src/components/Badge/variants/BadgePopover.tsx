import { forwardRef, Fragment, PropsWithChildren, Ref, useState } from 'react';

import { Divider } from '../../Divider';
import { Popover } from '../../Popover';
import { StackHorizontal } from '../../Stack';
import BadgeButton from '../button/BadgeButton';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = PropsWithChildren<
	BadgePrimitiveProps & {
		/**
		 * List of items displayed as buttons in Badge's right part.
		 */
		value: BadgePopoverItem[];
	}
>;

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	const { children, value } = props;

	const [showPopover, setShowPopover] = useState(false);

	return (
		<BadgePrimitive {...props} ref={ref}>
			<Popover
				disclosure={
					<BadgeButton
						componentId={'badgepopover-button'}
						data-testid={'badgepopover-button'}
						data-test={'badgepopover-button'}
						onClick={() => setShowPopover(!showPopover)}
					>
						<StackHorizontal gap="XXS" as="span" align="center">
							{value.map((item: BadgePopoverItem, idx: number) => {
								return (
									<Fragment key={`badgepopover-button-text-${item.id}`}>
										{idx > 0 && <Divider orientation="vertical" />}

										{item.label}
									</Fragment>
								);
							})}
						</StackHorizontal>
					</BadgeButton>
				}
			>
				{children}
			</Popover>
		</BadgePrimitive>
	);
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
