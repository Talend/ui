import React, { ButtonHTMLAttributes } from 'react';
import { Button } from 'reakit';
import classnames from 'classnames';
import { IconName } from '@talend/icons';
import Tooltip from '../../Tooltip';
import { Icon } from '../../Icon/Icon';
import Loading from '../../Loading';

import styles from './ButtonIcon.module.scss';

export type PossibleVariants = 'toggle' | 'floating' | 'default';

type CommonTypes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
	icon: IconName;
	children: string;
	isLoading?: boolean;
	onClick: () => void;
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

const Status = React.forwardRef((props: ButtonIconProps, ref: React.Ref<HTMLButtonElement>) => {
	const activeStatus = props.variant === 'toggle' ? props.isActive : false;
	const { children, variant, size, isLoading, icon, disabled, ...rest } = props;

	return (
		<Tooltip title={children} placement="top">
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
				{...(variant === 'toggle' && { 'aria-pressed': activeStatus })}
			>
				<span className={styles.buttonIcon__icon} aria-hidden>
					{!isLoading && icon && <Icon name={icon} />}
					{isLoading && <Loading />}
				</span>
			</Button>
		</Tooltip>
	);
});

export default Status;
