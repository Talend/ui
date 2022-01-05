import { IconName } from '@talend/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import * as S from './Link.style';

export type LinkProps = React.AnchorHTMLAttributes<any> & {
	/** The icon to display before */
	icon?: IconName | React.ReactElement;
	/** The icon to display before */
	iconBefore?: IconName | React.ReactElement;
	/** The icon to display after */
	iconAfter?: IconName | React.ReactElement;
	/** if the link is disabled */
	disabled?: boolean;
	/** if the link is external but the icon must not be shown */
	hideExternalIcon?: boolean;
};

export type StyledLink = { as?: React.ComponentType<any> | string } & React.PropsWithRef<LinkProps>;

const Link = React.forwardRef(
	(
		{
			className,
			children,
			iconAfter,
			iconBefore,
			icon = iconBefore,
			disabled,
			href,
			target,
			title,
			hideExternalIcon,
			as = 'a',
			...rest
		}: StyledLink,
		ref: React.Ref<any>,
	) => {
		const { t } = useTranslation();
		const isBlank: boolean = React.useMemo(
			() => !!target && !['_self', '_parent', '_top'].includes(target.toLowerCase()),
			[target],
		);
		const isExternal = React.useMemo(() => {
			if (!href) {
				return false;
			}
			return /^https?:\/\//i.test(href) && new URL(href).host !== location.host;
		}, [href]);

		const getTitle = React.useCallback(() => {
			if (disabled && title) {
				return t('LINK_DISABLED_TITLE', {
					title,
					defaultValue: '{{title}} (this link is disabled)',
				});
			}
			if (disabled) {
				return t('LINK_DISABLED', {
					defaultValue: 'This link is disabled',
				});
			}
			if (isBlank && title) {
				return t('LINK_EXTERNAL_TITLE', {
					title,
					defaultValue: '{{title}} (open in a new tab)',
				});
			}
			if (isBlank) {
				return t('LINK_EXTERNAL', {
					defaultValue: 'Open in a new tab',
				});
			}
			return title;
		}, [disabled, title, isBlank, t]);

		return (
			<S.Link
				rel={isBlank ? 'noopener noreferrer' : undefined}
				target={target}
				{...rest}
				href={!disabled ? href : undefined}
				className={`link ${disabled ? 'link--disabled' : ''} ${className || ''}`}
				title={getTitle()}
				aria-disabled={disabled}
				ref={ref}
				as={as}
			>
				{icon &&
					(typeof icon === 'string' ? (
						<Icon className="link__icon link__icon--before" name={icon} />
					) : (
						React.cloneElement(icon, {
							className: `${icon.props?.className} link__icon link__icon--before`,
						})
					))}
				<span className="link__text">{children}</span>
				{isExternal && !hideExternalIcon && (
					<Icon className="link__icon link__icon--external" name="talend-link" />
				)}
				{iconAfter &&
					(typeof iconAfter === 'string' ? (
						<Icon className="link__icon link__icon--after" name={iconAfter} />
					) : (
						React.cloneElement(iconAfter, {
							className: `${iconAfter.props?.className} link__icon link__icon--after`,
						})
					))}
			</S.Link>
		);
	},
);

export default Link;
