import React, { forwardRef, Ref } from 'react';
import { ButtonTertiary } from '../../Button';
import Divider from '../../Divider';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

export type BadgePopoverProps = Omit<BadgePrimitiveProps, 'withDivider'> & {
	value: BadgePopoverItem[];
};

const BadgePopover = forwardRef((props: BadgePopoverProps, ref: Ref<HTMLSpanElement>) => {
	const { isReadOnly, value } = props;

	return (
		<BadgePrimitive {...props} ref={ref} withDivider>
			{
				// TODO BADGE - to improve style
				<span>
					{value.map((item: BadgePopoverItem, idx: number) => (
						<span key={item.id}>
							{idx > 0 && <Divider orientation="vertical" />}
							<ButtonTertiary disabled={isReadOnly} onClick={item.onClick} size="S">
								{item.label}
							</ButtonTertiary>
						</span>
					))}
				</span>
			}
		</BadgePrimitive>
	);
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
