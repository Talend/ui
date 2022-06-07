import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import { IconName } from '@talend/icons';
import classnames from 'classnames';

import { Icon } from '../../Icon/Icon';

import styles from './InlineMessagePrimitive.module.scss';
import Link, { LinkProps } from '../../Link/Link';

export type AvailableVariantsTypes = 'destructive' | 'success' | 'information' | 'warning' | 'beta';
export type InlineMessageVariantType<T extends AvailableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedInlineMessageTypes = {
	withBackground?: boolean;
	link?: LinkProps;
	title?: string;
	description: string;
	icon: IconName;
	iconClassname: string;
	withBackgroundClassname: string;
};

export type BaseInlineMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> &
	SharedInlineMessageTypes;

const InlineMessagePrimitive = forwardRef(
	(
		{
			className,
			iconClassname,
			withBackgroundClassname,
			description,
			title,
			link,
			withBackground,
			icon,
			...props
		}: BaseInlineMessageProps,
		ref: Ref<HTMLDivElement>,
	) => {
		return (
			<div
				{...props}
				role="status"
				aria-live="polite"
				className={classnames(styles.inlineMessage, className, {
					[styles.inlineMessage_withBackground]: withBackground,
					[withBackgroundClassname]: withBackground,
				})}
				ref={ref}
			>
				<span className={classnames(styles.icon, iconClassname)}>
					<Icon name={icon} />
				</span>
				<p className={styles.inlineMessage__contents}>
					{title && <strong>{title}</strong>}
					<span>{description}</span>
					{link && <Link {...link} />}
				</p>
			</div>
		);
	},
);

export default InlineMessagePrimitive;
