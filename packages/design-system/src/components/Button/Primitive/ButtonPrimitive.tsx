import React, { forwardRef, Ref } from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';
import Clickable, { ClickableProps } from '../../Clickable';

import { StackHorizontal } from '../../Stack';
import Loading from '../../Loading';
import { Icon } from '../../Icon/Icon';

import styles from './ButtonStyles.module.scss';

export const availableVariants = {
	primary: 'primary',
	destructive: 'destructive',
	secondary: 'secondary',
	tertiary: 'tertiary',
} as const;

export const availableSizes = {
	M: 'M',
	S: 'S',
};

export type SharedButtonTypes = {
	size?: keyof typeof availableSizes;
	icon?: IconName | React.ReactElement;
	isLoading?: boolean;
	isDropdown?: boolean;
};

export type BaseButtonProps = Omit<ClickableProps, 'style'> & SharedButtonTypes;

const ButtonPrimitive = forwardRef(
	(
		{
			className,
			children,
			onClick,
			size = 'M',
			icon,
			isLoading = false,
			isDropdown = false,
			...props
		}: BaseButtonProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		return (
			<Clickable
				className={classnames(styles.button, className, {
					[styles['size-S']]: size === availableSizes.S,
				})}
				{...props}
				aria-busy={isLoading}
				ref={ref}
				onClick={!isLoading ? onClick : () => {}}
			>
				<StackHorizontal gap="XS" as="span" align="center">
					{isLoading && (
						<span className={styles.button__loading}>
							<Loading data-test="button.loading" name={icon} aria-hidden />
						</span>
					)}
					{!isLoading && icon && size === 'M' && (
						<span className={styles.button__icon}>
							{typeof icon === 'string' ? <Icon name={icon} /> : React.cloneElement(icon, {})}
						</span>
					)}
					{children}
					{isDropdown && (
						<span className={styles.button__caret}>
							<Icon name="talend-caret-down" />
						</span>
					)}
				</StackHorizontal>
			</Clickable>
		);
	},
);

export default ButtonPrimitive;
