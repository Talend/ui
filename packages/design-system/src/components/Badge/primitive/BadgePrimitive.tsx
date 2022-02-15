import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

import { ButtonIcon } from '../../ButtonIcon';
import { StackHorizontal } from '../../Stack';

import style from './BadgePrimitive.module.scss';

type SanitizedBadgeProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>;

export type BadgeProps = Omit<SanitizedBadgeProps, 'className'> & {
	label: string;
};

export const Label = ({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) => (
	<StackHorizontal size="XS" data-ellipsis>
		<span {...rest} data-test="badge.label">
			{children}
		</span>
	</StackHorizontal>
);

export const RemoveButton = ({
	onClick,
}: {
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
}) => (
	<ButtonIcon icon="talend-cross" size="XS" onClick={onClick} data-test="badge.remove">
		Remove
	</ButtonIcon>
);

const BadgePrimitive = forwardRef(
	({ className, children }: SanitizedBadgeProps, ref: Ref<HTMLSpanElement>) => {
		return (
			<span className={classNames(style.badge, className)} ref={ref}>
				<StackHorizontal gap="XS" align="center">
					{children}
				</StackHorizontal>
			</span>
		);
	},
);

export default BadgePrimitive;
