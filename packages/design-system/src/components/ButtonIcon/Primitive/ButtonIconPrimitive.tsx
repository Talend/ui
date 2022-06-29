import React, { forwardRef, Ref, ButtonHTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import { IconNameWithSize, IconName } from '@talend/icons/dist/typeUtils';

import Button from '../../Clickable';
import Tooltip, { TooltipPlacement } from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';

import styles from './ButtonIcon.module.scss';
import { SizedIcon } from '../../Icon';

export type AvailableSizes = 'M' | 'S' | 'XS';
export type PossibleVariants = 'toggle' | 'floating' | 'default';
type IconType<S extends AvailableSizes> =
	| React.ReactElement
	| IconNameWithSize<S extends 'XS' ? 'S' : 'M'>
	| IconName;

type CommonTypes<S extends AvailableSizes> = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'className' | 'style'
> & {
	children: string;
	isLoading?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	tooltipPlacement?: TooltipPlacement;
	size?: S;
	icon: IconType<S>;
};

export type ToggleTypes<S extends AvailableSizes> = CommonTypes<S> & {
	variant: 'toggle';
	isActive: boolean;
};

export type FloatingTypes<S extends AvailableSizes> = CommonTypes<S> & {
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
	function parsedIcon(iconSrc: string | ReactElement) {
		const { icon, size } = props;

		if (typeof iconSrc === 'string') {
			if (iconSrc.includes('talend-') || iconSrc.includes('remote-') || iconSrc.includes('src-')) {
				return <Icon name={icon} />;
			}
			return (
				<SizedIcon
					size={size === 'XS' ? 'S' : 'M'}
					name={size === 'M' ? (icon as IconNameWithSize<'M'>) : (icon as IconNameWithSize<'S'>)}
				/>
			);
		}

		return React.cloneElement(iconSrc, {});
	}

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
					{!isLoading && parsedIcon()}
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
