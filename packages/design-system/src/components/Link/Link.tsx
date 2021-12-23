import { IconName } from '@talend/icons';
import React, {
	AnchorHTMLAttributes,
	cloneElement,
	ComponentType,
	createElement,
	forwardRef,
	PropsWithRef,
	ReactElement,
	Ref,
	useCallback,
	useMemo,
} from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';

import style from './Link.module.scss';

export type LinkProps = AnchorHTMLAttributes<any> & {
	/** The icon to display before */
	icon?: IconName | ReactElement;
	/** The icon to display before */
	iconBefore?: IconName | ReactElement;
	/** The icon to display after */
	iconAfter?: IconName | ReactElement;
	/** if the link is disabled */
	disabled?: boolean;
	/** if the link is external but the icon must not be shown */
	hideExternalIcon?: boolean;
};

export type StyledLink = { as?: ComponentType<any> | string } & PropsWithRef<LinkProps>;

const Link = forwardRef(
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
		ref: Ref<any>,
	) => {
		const { t } = useTranslation();
		const isBlank: boolean = useMemo(
			() => !!target && !['_self', '_parent', '_top'].includes(target.toLowerCase()),
			[target],
		);
		const isExternal = useMemo(() => {
			if (!href) {
				return false;
			}
			return /^https?:\/\//i.test(href) && new URL(href).host !== location.host;
		}, [href]);

		const getTitle = useCallback(() => {
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
		}, [disabled, title, isExternal, isBlank]);

		return createElement(
			as,
			{
				rel: isBlank ? 'noopener noreferrer' : undefined,
				target,
				...rest,
				href: !disabled ? href : undefined,
				className: classNames(style.link, { [style.linkDisabled]: disabled }),
				title: getTitle(),
				'aria-disabled': disabled,
				ref,
			},
			<>
				{icon &&
					(typeof icon === 'string' ? (
						<Icon className={classNames(style.link__Icon, style.link__iconBefore)} name={icon} />
					) : (
						cloneElement(icon, {
							className: classNames(
								icon.props?.className,
								style.link__icon,
								style.link__iconBefore,
							),
						})
					))}
				<span className={style.link__text}>{children}</span>
				{isExternal && !hideExternalIcon && (
					<Icon
						className={classNames(style.link__Icon, style.link__iconExternal)}
						name="talend-link"
					/>
				)}
				{iconAfter &&
					(typeof iconAfter === 'string' ? (
						<Icon
							className={classNames(style.link__Icon, style.link__iconAfter)}
							name={iconAfter}
						/>
					) : (
						cloneElement(iconAfter, {
							className: classNames(
								iconAfter.props?.className,
								style.link__icon,
								style.link__iconAfter,
							),
						})
					))}
			</>,
		);
	},
);

export default Link;
