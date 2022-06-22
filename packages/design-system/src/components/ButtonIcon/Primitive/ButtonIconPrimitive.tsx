import React, { forwardRef, Ref, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { IconName } from '@talend/icons/dist/Figma';
import Button from '../../Clickable';
import Tooltip, { TooltipPlacement } from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';

import styles from './ButtonIcon.module.scss';

export type PossibleVariants = 'toggle' | 'floating' | 'default';

type CommonTypes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
	icon: IconName;
	children: string;
	isLoading?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	tooltipPlacement?: TooltipPlacement;
};

export type ToggleTypes = CommonTypes & {
	variant: 'toggle';
	isActive: boolean;
	size?: 'M' | 'S';
};

export type FloatingTypes = CommonTypes & {
	variant: 'floating';
	size?: 'M' | 'S';
};

export type DefaultTypes = CommonTypes & {
	variant: 'default';
	size?: 'M' | 'S' | 'XS';
};

export type ButtonIconProps = ToggleTypes | FloatingTypes | DefaultTypes;

const ButtonIconPrimitive = forwardRef((props: ButtonIconProps, ref: Ref<HTMLButtonElement>) => {
	const activeButtonIconPrimitive = props.variant === 'toggle' ? props.isActive : false;
	const { children, variant, size, isLoading, icon, disabled, tooltipPlacement, ...rest } = props;

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
					{!isLoading && icon && <Icon name={icon} />}
					{isLoading && <Loading />}
				</span>
			</Button>
		</Tooltip>
	);
});

export default ButtonIconPrimitive;
