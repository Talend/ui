import { forwardRef, Ref } from 'react';
import classnames from 'classnames';
import Linkable, { LinkableType } from '../../Linkable';

import { StackHorizontal } from '../../Stack';

import { AvailableSizes, SharedButtonTypes } from '../../Button/Primitive/ButtonPrimitive';

import sharedStyles from '../../Button/Primitive/ButtonStyles.module.scss';
import linkStyles from './ButtonPrimitiveAsLink.module.scss';
import { getIconWithDeprecatedSupport } from '../../Icon/DeprecatedIconHelper';

export type BaseButtonPropsAsLink<S extends AvailableSizes> = LinkableType &
	Omit<SharedButtonTypes<S>, 'isDropdown' | 'isLoading'>;

function PrimitiveAsLink<S extends AvailableSizes>(
	props: BaseButtonPropsAsLink<S>,
	ref: Ref<HTMLAnchorElement>,
) {
	const { className, children, onClick, size = 'M', icon, ...rest } = props;
	return (
		<Linkable
			className={classnames(sharedStyles.button, linkStyles.button, className, {
				[sharedStyles['size-S']]: size === 'S',
			})}
			{...rest}
			ref={ref}
		>
			<StackHorizontal gap="XXS" as="span" align="center">
				{icon && (
					<span className={sharedStyles.button__icon}>
						{getIconWithDeprecatedSupport({ iconSrc: icon, size: size === 'S' ? 'S' : 'M' })}
					</span>
				)}
				{children}
			</StackHorizontal>
		</Linkable>
	);
}

const ButtonPrimitiveAsLink = forwardRef(PrimitiveAsLink) as <S extends AvailableSizes>(
	props: BaseButtonPropsAsLink<S> & { ref?: Ref<HTMLAnchorElement> },
) => ReturnType<typeof PrimitiveAsLink>;

export default ButtonPrimitiveAsLink;
