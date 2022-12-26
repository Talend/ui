import React, { PropsWithChildren, Ref } from 'react';

import Divider from '../../Divider';

import classnames from 'classnames';
import styles from './BadgePrimitive.module.scss';
import { StackHorizontal } from '../../Stack';

/**
 * Possible semantic values.
 */
type SemanticIcon = 'valid' | 'invalid' | 'empty' | 'none';

/**
 * Badge variants.
 */
type Variants = 'badge' | 'tag' | 'dropdown' | 'popover';

/**
 * Describe item used for BadgeDropdown.
 */
export interface BadgeDropdownItem {
	id: string;
	label: string;
}

/**
 * Describe item used for BadgePopover.
 */
export interface BadgePopoverItem {
	id: string;
	label: string;
	onClick: () => void;
}

export type BadgeVariantType<T extends Variants, P extends BadgePrimitiveProps> = {
	variant: T;
} & P;

// --------------------------------------------------
// Badge Divider
// --------------------------------------------------

interface BadgeDividerProps {
	withOperator: boolean;
}

function BadgeDivider({ withOperator }: BadgeDividerProps) {
	// TODO BADGE - create operator component (data-testid="badge-operator")
	return withOperator ? (
		<></>
	) : (
		<span className={classnames(styles.badge__divider)} data-testid="badge-divider">
			<Divider orientation="vertical" />
		</span>
	);
}

// --------------------------------------------------
// Badge Primitive
// --------------------------------------------------

interface BadgeInternalProps {
	withDivider?: boolean;
}

export interface BadgePrimitiveProps {
	label: string;
	onClose?: () => void;
	ref: Ref<HTMLSpanElement>;
	semanticIcon?: SemanticIcon;
	withOperator?: boolean;
}

function BadgePrimitive({
	children,
	label,
	onClose,
	ref,
	semanticIcon = 'none',
	withDivider = false,
	withOperator = false,
}: PropsWithChildren<BadgePrimitiveProps & BadgeInternalProps>) {
	// TODO BADGE - handle onClose to manage close button

	// TODO BADGE - handle semanticIcon to display semantic icon

	return (
		<span className={classnames(styles.badge)} ref={ref}>
			<StackHorizontal
				gap="XXS"
				padding={{ top: 0, right: 'XXS', bottom: 0, left: 'XXS' }}
				align="center"
				display="inline"
			>
				<span className={classnames(styles.badge__name)} data-testid="badge-label">
					{label}
				</span>

				{withDivider && <BadgeDivider withOperator={withOperator} />}

				{children}
			</StackHorizontal>
		</span>
	);
}

export default BadgePrimitive;
