import { ButtonHTMLAttributes, forwardRef, ReactElement, Ref } from 'react';
import * as React from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';

import { DeprecatedIconNames } from '../../../types';
import Button from '../../Clickable';
import Tooltip, { TooltipPlacement } from '../../Tooltip';
import Loading from '../../Loading';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './ButtonIcon.module.scss';

export type AvailableSizes = 'M' | 'S' | 'XS';
export type PossibleVariants = 'toggle' | 'floating' | 'default';

type CommonTypes<S extends Partial<AvailableSizes>> = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'className' | 'style'
> & {
	children: string;
	isLoading?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	tooltipPlacement?: TooltipPlacement;
	size?: S;
	icon: ReactElement | IconNameWithSize<S extends 'XS' ? 'S' : 'M'> | DeprecatedIconNames;
};

export type ToggleTypes<S extends Partial<AvailableSizes>> = CommonTypes<S> & {
	variant: 'toggle';
	isActive: boolean;
};

export type FloatingTypes<S extends Partial<AvailableSizes>> = CommonTypes<S> & {
	variant: 'floating';
};

export type DefaultTypes<S extends AvailableSizes> = CommonTypes<S> & {
	variant: 'default';
};

export type ButtonIconProps<S extends AvailableSizes> =
	| ToggleTypes<S>
	| FloatingTypes<S>
	| DefaultTypes<S>;

function Primitive<S extends AvailableSizes>(
	props: ButtonIconProps<S>,
	ref: Ref<HTMLButtonElement>,
) {
	const {
		children,
		variant,
		size = 'M',
		isLoading,
		icon,
		disabled,
		tooltipPlacement,
		...rest
	} = props;
	const activeButtonIconPrimitive = props.variant === 'toggle' ? props.isActive : false;

	return (
		<Tooltip title={children} placement={tooltipPlacement || 'top'}>
			<Button
				{...rest}
				className={classnames(styles.buttonIcon, {
					[styles.floating]: variant === 'floating',
					[styles.toggle]: variant === 'toggle',
					[styles.size_S]: size === 'S',
					[styles.size_XS]: size === 'XS',
				})}
				ref={ref}
				disabled={disabled || isLoading}
				{...(variant === 'toggle' && { 'aria-pressed': activeButtonIconPrimitive })}
			>
				<span className={styles.buttonIcon__icon} aria-hidden>
					{!isLoading &&
						getIconWithDeprecatedSupport({ iconSrc: icon, size: size === 'XS' ? 'S' : 'M' })}
					{isLoading && <Loading />}
				</span>
			</Button>
		</Tooltip>
	);
}

const ButtonIconPrimitive = forwardRef(Primitive) as <S extends AvailableSizes>(
	props: ButtonIconProps<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof Primitive>;

export default ButtonIconPrimitive;
