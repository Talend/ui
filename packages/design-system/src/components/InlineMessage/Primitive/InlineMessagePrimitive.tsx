import { forwardRef, HTMLAttributes, Ref } from 'react';
// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';

import styles from './InlineMessagePrimitive.module.scss';
import Link, { LinkProps } from '../../Link/Link';
import { SizedIcon } from '../../Icon';

export type AvailableVariantsTypes = 'destructive' | 'success' | 'information' | 'warning' | 'beta';
export type InlineMessageVariantType<T extends AvailableVariantsTypes, P extends object> = {
	variant: T;
} & P;

export type SharedInlineMessageTypes = {
	withBackground?: boolean;
	link?: LinkProps;
	title?: string;
	description: string;
	icon: IconNameWithSize<'M'>;
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
					<SizedIcon size="M" name={icon} />
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
