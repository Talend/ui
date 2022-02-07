import React, { forwardRef, Ref } from 'react';
import classnames from 'classnames';
import Linkable, { LinkableType } from '../../Linkable';

import { StackHorizontal } from '../../Stack';
import { Icon } from '../../Icon/Icon';

import { availableSizes, SharedButtonTypes } from '../../Button/Primitive/ButtonPrimitive';

import sharedStyles from '../../Button/Primitive/ButtonStyles.module.scss';
import linkStyles from './ButtonPrimitiveAsLink.module.scss';

export type BaseButtonPropsAsLink = LinkableType &
	Omit<SharedButtonTypes, 'isDropdown' | 'isLoading'>;

const ButtonPrimitiveAsLink = forwardRef(
	(
		{ className, children, onClick, size = 'M', icon, ...props }: BaseButtonPropsAsLink,
		ref: Ref<HTMLAnchorElement>,
	) => {
		return (
			<Linkable
				className={classnames(sharedStyles.button, linkStyles.button, className, {
					[sharedStyles['size-S']]: size === availableSizes.S,
				})}
				{...props}
				ref={ref}
			>
				<StackHorizontal gap="XXS" as="span" align="center">
					{icon && size === 'M' && (
						<span className={sharedStyles.button__icon}>
							{typeof icon === 'string' ? <Icon name={icon} /> : React.cloneElement(icon, {})}
						</span>
					)}
					{children}
				</StackHorizontal>
			</Linkable>
		);
	},
);

export default ButtonPrimitiveAsLink;
