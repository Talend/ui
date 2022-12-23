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
	children?: string;
	onClick?: () => void;
}

function BadgePopoverButton({ children, onClick }: BadgePopoverButtonProps) {
	return (
		<Clickable className={classnames(styles['badge-popover__button'])} onClick={onClick}>
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
						<React.Fragment key={`fragment-${item.id}`}>
							{idx > 0 && <Divider key={`divider-${item.id}`} orientation="vertical" />}
							<BadgePopoverButton key={`button-${item.id}`} onClick={item.onClick}>
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
