import React, { Ref } from 'react';

import classnames from 'classnames';

import { ButtonTertiary } from '../../Button';
import Divider from '../../Divider';
import Dropdown, { DropdownItemType } from '../../Dropdown/Dropdown';

import styles from './BadgePrimitive.module.scss';

const noOp = () => {};

/**
 * Possible ways to display or not the value.
 */
type ValueLayout = 'off' | 'single' | 'multi';

/**
 * Possible semantic values.
 */
type SemanticIcon = 'valid' | 'invalid' | 'empty' | 'none';

/**
 * Badge variants.
 */
type Variants = 'badge' | 'tag' | 'dropdown' | 'popover';

export type BadgeVariantType<T extends Variants, P extends BadgePrimitiveProps> = {
	variant: T;
} & P;

export interface BadgePrimitiveProps {
	isDropdown?: boolean;
	isReadOnly?: boolean;
	name: string;
	onClose?: () => void;
	ref: Ref<HTMLSpanElement>;
	semanticIcon?: SemanticIcon;
	value?: string | DropdownItemType[];
	valueLayout?: ValueLayout;
	withOperator?: boolean;
}

function BadgePrimitive({
	isDropdown = false,
	isReadOnly = false,
	name,
	onClose,
	ref,
	semanticIcon = 'none',
	value,
	valueLayout = 'off',
	withOperator = false,
}: BadgePrimitiveProps) {
	return (
		<span className={classnames(styles.badge)} ref={ref}>
			{name}

			{valueLayout !== 'off' && <Divider orientation="vertical" />}

			{Array.isArray(value) ? (
				// TODO JMA : replace & translate Open
				<Dropdown aria-label="Open" items={value}>
					<ButtonTertiary isDropdown onClick={noOp}>
						Dropdown
					</ButtonTertiary>
				</Dropdown>
			) : (
				value
			)}
		</span>
	);
}

export default BadgePrimitive;
