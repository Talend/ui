import { forwardRef, ReactElement, Ref } from 'react';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';
import { ClickableProps } from '../../Clickable';

import { DataAttributes, DeprecatedIconNames } from '../../../types';
import { StackHorizontal } from '../../Stack';
import Loading from '../../Loading';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

import styles from './ButtonStyles.module.scss';
import { SizedIcon } from '../../Icon';

export type AvailableVariantsTypes = 'primary' | 'destructive' | 'secondary' | 'tertiary';
export type AvailableSizes = 'M' | 'S';
export type ButtonVariantType<T extends AvailableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedButtonTypes<S extends AvailableSizes> = {
	isLoading?: boolean;
	isDropdown?: boolean;
	size?: S;
	icon?: IconNameWithSize<'S'> | DeprecatedIconNames | ReactElement | IconNameWithSize<'M'>;
};

export type BaseButtonProps<S extends AvailableSizes> = Omit<ClickableProps, 'style'> &
	SharedButtonTypes<S> &
	Partial<DataAttributes>;

function ButtonPrimitiveInner<S extends AvailableSizes>(
	props: BaseButtonProps<S>,
	ref: Ref<HTMLButtonElement>,
) {
	const {
		className,
		children,
		onClick,
		size,
		icon,
		isLoading = false,
		isDropdown = false,
		...rest
	} = props;
	const cls = {
		[styles['size-S']]: size === 'S',
	};
	return (
		<button
			className={classnames(styles.button, styles.clickable, className, cls)}
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
				{!isLoading && icon && (
					<span className={styles.button__icon}>
						{getIconWithDeprecatedSupport({ iconSrc: icon, size: size || 'M' })}
					</span>
				)}
				{children}
				{isDropdown && (
					<span className={styles.button__caret}>
						<SizedIcon size="S" name="chevron-down" />
					</span>
				)}
			</StackHorizontal>
		</button>
	);
}

const ButtonPrimitive = forwardRef(ButtonPrimitiveInner) as <S extends AvailableSizes>(
	props: BaseButtonProps<S> & { ref?: Ref<HTMLButtonElement> },
) => ReturnType<typeof ButtonPrimitiveInner>;

export default ButtonPrimitive;
