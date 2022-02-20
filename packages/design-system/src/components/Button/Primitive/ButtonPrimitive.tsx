import React, { forwardRef, Ref } from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';
import Clickable, { ClickableProps } from '../../Clickable';

import { StackHorizontal } from '../../Stack';
import Loading from '../../Loading';
import { Icon } from '../../Icon/Icon';

import styles from './ButtonStyles.module.scss';

export type availableVariantsTypes = 'primary' | 'destructive' | 'secondary' | 'tertiary';
export type availableSizes = 'M' | 'S';
export type ButtonVariantType<T extends availableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedButtonTypes = {
	size?: availableSizes;
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
					[styles['size-S']]: size === 'S',
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
					<span className={styles.button__text}>{children}</span>
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
