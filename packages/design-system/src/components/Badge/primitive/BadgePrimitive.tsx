import React, { PropsWithChildren, Ref } from 'react';

import Divider from '../../Divider';

import classnames from 'classnames';
import styles from './BadgePrimitive.module.scss';
import { StackHorizontal } from '../../Stack';
import { DataAttributes } from 'src/types';

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

function BadgeDivider() {
	// TODO BADGE - create operator component (data-testid="badge-operator")
	return (
		<span className={classnames(styles.badge__divider)} data-testid="badge-divider">
			<Divider orientation="vertical" />
		</span>
	);
}

// --------------------------------------------------
// Badge Primitive
// --------------------------------------------------

export type BadgePrimitiveProps = {
	label: string;
	onClose?: () => void;
	ref: Ref<HTMLSpanElement>;
	semanticIcon?: SemanticIcon;
} & Partial<DataAttributes>;

function BadgePrimitive({
	children,
	'data-testid': dataTestId,
	'data-test': dataTest,
	label,
	onClose,
	ref,
	semanticIcon = 'none',
}: PropsWithChildren<BadgePrimitiveProps>) {
	// TODO BADGE - handle onClose to manage close button

	// TODO BADGE - handle semanticIcon to display semantic icon

	// TODO BADGE - implement withOperator props

	const defaultTestId = 'badge-label';

	return (
		<span className={classnames(styles.badge)} ref={ref}>
			<StackHorizontal
				gap="XXS"
				padding={{ top: 0, right: 'XXS', bottom: 0, left: 'XXS' }}
				align="center"
				display="inline"
			>
				<span
					className={classnames(styles.badge__label)}
					data-testid={dataTestId ? `${dataTestId}.${defaultTestId}` : defaultTestId}
					data-test={dataTest ? `${dataTest}.${defaultTestId}` : defaultTestId}
				>
					{label}
				</span>

				{React.Children.count(children) > 0 && <BadgeDivider />}

				{children}
			</StackHorizontal>
		</span>
	);
}

export default BadgePrimitive;
