import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledProps } from 'styled-components';
import { BoxProps } from 'reakit';
import { IconName } from '@talend/icons';

import { Icon } from '../Icon/Icon';

import * as S from './Link.style';

export type LinkProps = BoxProps &
	StyledProps<any> &
	React.AnchorHTMLAttributes<any> & {
		/** The icon to display before */
		iconBefore?: IconName | React.ReactElement;
		/** The icon to display after */
		iconAfter?: IconName | React.ReactElement;
		/** if the link is disabled */
		disabled?: boolean;
		/** if the link is external but the icon must not be shown */
		hideExternalIcon?: boolean;
	};

const Link = React.forwardRef(
	(
		{
			className,
			children,
			iconAfter,
			iconBefore,
			disabled,
			href,
			target,
			title,
			hideExternalIcon,
			...rest
		}: LinkProps,
		ref,
	) => {
		const { t } = useTranslation();
		const isBlank = React.useMemo(() => target?.toLowerCase() === '_blank', [target]);

		const isExternal = React.useMemo(() => {
			return /^https?:\/\//i.test(href) && new URL(href).host !== location.host;
		}, [target]);

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
			if (isExternal && isBlank && title) {
				return t('LINK_EXTERNAL_TITLE', {
					title,
					defaultValue: '{{title}} (open in a new tab)',
				});
			}
			if (isExternal && isBlank) {
				return t('LINK_EXTERNAL', {
					defaultValue: 'Open in a new tab',
				});
			}
			return title;
		}, [disabled, title, isExternal]);

		return (
			<S.Link
				rel={isBlank ? 'noopener noreferrer' : null}
				target={target}
				{...rest}
				href={!disabled ? href : null}
				className={`link ${disabled ? 'link--disabled' : ''} ${className || ''}`}
				title={getTitle()}
				ariaDisabled={disabled ? 'true' : null}
				ref={ref}
			>
				{iconBefore &&
					(typeof iconBefore === 'string' ? (
						<Icon className="link__icon link__icon--before" name={iconBefore} />
					) : (
						React.cloneElement(iconBefore, {
							className: `${iconBefore.props?.className} link__icon link__icon--before`,
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
