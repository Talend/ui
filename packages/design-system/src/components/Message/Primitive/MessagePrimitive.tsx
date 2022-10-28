import React, { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';

import styles from './MessageStyles.module.scss';
import { LinkProps } from '../../Link/Link';
import { SizedIcon } from '../../Icon';
import { StackHorizontal, StackVertical } from '../../Stack';
export type AvailableVariantsTypes = 'error' | 'success' | 'information' | 'warning';
export type MessageVariantType<T extends AvailableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedMessageTypes = {
	borderClassname: string;
	link?: LinkProps;
	title: string;
	description: string;
	icon?: IconNameWithSize<'M'>;
	children?: ReactNode | ReactNode[];
};

export type BaseInlineMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> &
	SharedMessageTypes;

export const MessagePrimitive = forwardRef(
	(
		{
			borderClassname,
			className,
			description,
			title,
			link,
			icon,
			children,
			...props
		}: BaseInlineMessageProps,
		ref: Ref<HTMLDivElement>,
	) => {
		return (
			<div
				{...props}
				role="status"
				aria-live="polite"
				className={classnames(styles.message, className)}
				ref={ref}
			>
				<StackHorizontal gap={0}>
					<div className={classnames(styles.message__border, borderClassname)} />
					<StackVertical gap="S" padding={{ top: 'S', bottom: 'S', left: 'M', right: 'M' }}>
						<header className={styles.message__title}>
							<StackHorizontal gap="S">
								{icon && <SizedIcon name={icon} size="M" />}
								{title}
							</StackHorizontal>
						</header>
						<p className={styles.message__description}>{description}</p>
						{children}
					</StackVertical>
				</StackHorizontal>
			</div>
		);
	},
);

MessagePrimitive.displayName = 'MessagePrimitive';
