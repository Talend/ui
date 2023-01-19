import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';

import tokens from '@talend/design-tokens';

import { DataAttributes } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import Divider from '../../Divider';
import { SizedIcon } from '../../Icon';
import { StackHorizontal } from '../../Stack';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { BadgeOperator, OperatorButton } from '../OperatorButton/OperatorButton';

import styles from './BadgePrimitive.module.scss';

/**
 * Possible semantic values.
 */
type SemanticIcon = 'valid' | 'invalid' | 'none';

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

export type BadgeOperators = {
	selected?: BadgeOperator;
	list: BadgeOperator[];
	onChange: (operator: BadgeOperator) => void;
};

export type BadgePrimitiveProps = {
	label: string;
	onClose?: () => void;
	closeButtonLabel?: string;
	semanticIcon?: SemanticIcon;
	operators?: BadgeOperators;
} & DataAttributes;

function BadgePrimitive({
	'data-test': dataTest,
	'data-testid': dataTestId,
	children,
	closeButtonLabel,
	label,
	onClose,
	operators,
	semanticIcon = 'none',
}: PropsWithChildren<BadgePrimitiveProps>) {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const defaultTestId = 'badge-label';
	const defaultCloseTestId = 'badge-label-close';

	return (
		<span className={classnames(styles.badge)}>
			<StackHorizontal
				gap="XXS"
				padding={{ top: 0, right: 'XS', bottom: 0, left: 'XS' }}
				align="center"
				display="inline"
			>
				<StackHorizontal gap="XXS" align="center" display="inline">
					{semanticIcon !== 'none' && (
						<SizedIcon
							size="S"
							name={semanticIcon === 'valid' ? 'check-filled' : 'square-cross'}
							color={
								semanticIcon === 'valid'
									? tokens.coralColorChartsColor04
									: tokens.coralColorDangerIcon
							}
						/>
					)}

					<span
						className={classnames(styles.badge__label)}
						data-testid={dataTestId ? `${dataTestId}.${defaultTestId}` : defaultTestId}
						data-test={dataTest ? `${dataTest}.${defaultTestId}` : defaultTestId}
					>
						{label}
					</span>
				</StackHorizontal>

				{React.Children.count(children) > 0 && !operators && <BadgeDivider />}
				{React.Children.count(children) > 0 && operators && (
					<OperatorButton
						operators={operators.list}
						selectedOperator={operators.selected ? operators.selected : operators.list[0]}
						onChange={operators.onChange}
					/>
				)}

				{children}

				{onClose && (
					<ButtonIcon
						icon="cross"
						size="XS"
						onClick={onClose}
						data-testid={dataTestId ? `${dataTestId}.${defaultCloseTestId}` : defaultCloseTestId}
						data-test={dataTest ? `${dataTest}.${defaultCloseTestId}` : defaultCloseTestId}
					>
						{closeButtonLabel || t<string>('CLOSE', 'Close')}
					</ButtonIcon>
				)}
			</StackHorizontal>
		</span>
	);
}

export default BadgePrimitive;
