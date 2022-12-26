import React, { forwardRef, Ref } from 'react';

import Clickable from '../../Clickable';
import Divider from '../../Divider';
import { StackHorizontal } from '../../Stack';
import BadgePrimitive, { BadgePopoverItem, BadgePrimitiveProps } from '../primitive/BadgePrimitive';

import classnames from 'classnames';
import styles from './BadgePopover.module.scss';

// --------------------------------------------------
// Badge Popover button
// --------------------------------------------------

interface BadgePopoverButtonProps {
	componentId?: string;
	children?: string;
	onClick?: () => void;
}

function BadgePopoverButton({ componentId, children, onClick }: BadgePopoverButtonProps) {
	return (
		<Clickable
			className={classnames(styles['badge-popover__button'])}
			data-testid={componentId}
			key={componentId}
			onClick={onClick}
		>
			{children}
		</Clickable>
	);
}

// --------------------------------------------------
// Badge Dropdown
// --------------------------------------------------

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

							<BadgePopoverButton
								componentId={`badgepopover-button-${item.id}`}
								onClick={item.onClick}
							>
								{item.label}
							</BadgePopoverButton>
						</React.Fragment>
					))}
				</StackHorizontal>
			}
		</BadgePrimitive>
	);
});

BadgePopover.displayName = 'BadgePopover';

export default BadgePopover;
