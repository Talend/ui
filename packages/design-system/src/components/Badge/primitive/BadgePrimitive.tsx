import React, { Ref } from 'react';

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
	// TODO BADGE - create operator component
	return withOperator ? (
		<></>
	) : (
		<span className={classnames(styles.badge__divider)}>
			<Divider orientation="vertical" />
		</span>
	);
}

// --------------------------------------------------
// Badge Primitive
// --------------------------------------------------

export interface BadgePrimitiveProps {
	children?: JSX.Element | string;
	isReadOnly?: boolean;
	name: string;
	onClose?: () => void;
	ref: Ref<HTMLSpanElement>;
	semanticIcon?: SemanticIcon;
	withDivider?: boolean;
	withOperator?: boolean;
}

function BadgePrimitive({
	children,
	isReadOnly = false,
	name,
	onClose,
	ref,
	semanticIcon = 'none',
	withDivider = false,
	withOperator = false,
}: BadgePrimitiveProps) {
	// TODO BADGE - handle isReadOnly to allow read only mode (may impact variant component to handle w/ children)

	// TODO BADGE - handle onClose to manage close button

	// TODO BADGE - handle semanticIcon to display semantic icon

	return (
		<span className={classnames(styles.badge)} ref={ref}>
			<StackHorizontal
				gap="XS"
				padding={{ top: 0, right: 'XS', bottom: 0, left: 'XS' }}
				align="center"
				display="inline"
			>
				<span className={classnames(styles.badge__name)}>{name}</span>

				{withDivider && <BadgeDivider withOperator={withOperator} />}

				{children}
			</StackHorizontal>
		</span>
	);
}

export default BadgePrimitive;
