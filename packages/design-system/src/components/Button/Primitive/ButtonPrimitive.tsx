import React, { forwardRef, Ref } from 'react';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';
import Clickable, { ClickableProps } from '../../Clickable';

import { StackHorizontal } from '../../Stack';
import Loading from '../../Loading';
import { Icon } from '../../Icon/Icon';
import { DataAttributes, DeprecatedIconNames } from '../../../types';
import { SizedIcon } from '../../Icon';

import styles from './ButtonStyles.module.scss';

export type AvailableVariantsTypes = 'primary' | 'destructive' | 'secondary' | 'tertiary';
export type AvailableSizes = 'M' | 'S';
export type ButtonVariantType<T extends AvailableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedButtonTypes<S extends AvailableSizes> = {
	isLoading?: boolean;
	isDropdown?: boolean;
	size?: S;
	icon?: S extends 'XS'
		? IconNameWithSize<'S'>
		: DeprecatedIconNames | React.ReactElement | IconNameWithSize<'M'>;
};

export type BaseButtonProps<S extends AvailableSizes> = Omit<ClickableProps, 'style'> &
	SharedButtonTypes<S> &
	Partial<DataAttributes>;

function ButtonPrimitiveInner<S extends AvailableSizes>(
	props: BaseButtonProps<S>,
	ref?: Ref<HTMLButtonElement>,
) {
	function parsedIcon() {
		const { icon, size } = props;
		if (!icon) {
			return null;
		}
		if (typeof icon === 'string') {
			if (icon.includes('talend-')) {
				return <Icon name={icon} />;
			}
			return (
				<SizedIcon
					size={size ? size : 'M'}
					name={size === 'M' ? (icon as IconNameWithSize<'M'>) : (icon as IconNameWithSize<'S'>)}
				/>
			);
		}

		return React.cloneElement(icon, {});
	}
	const {
		className,
		children,
		onClick,
		size = 'M',
		icon,
		isLoading = false,
		isDropdown = false,
		...rest
	} = props;
	return (
		<Clickable
			className={classnames(styles.button, className, {
				[styles['size-S']]: size === 'S',
			})}
			{...rest}
			aria-busy={isLoading}
			ref={ref}
			onClick={!isLoading ? onClick : () => {}}
		>
			<StackHorizontal gap="XS" as="span" align="center">
				{isLoading && (
					<span className={styles.button__loading}>
						<Loading data-test="button.loading" aria-hidden />
					</span>
				)}
				{!isLoading && icon && <span className={styles.button__icon}>{parsedIcon()}</span>}
				{children}
				{isDropdown && (
					<span className={styles.button__caret}>
						<Icon name="talend-caret-down" />
					</span>
				)}
			</StackHorizontal>
		</Clickable>
	);
}

const ButtonPrimitive = forwardRef(ButtonPrimitiveInner) as <S extends AvailableSizes>(
	props: BaseButtonProps<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof ButtonPrimitiveInner>;

export default ButtonPrimitive;
