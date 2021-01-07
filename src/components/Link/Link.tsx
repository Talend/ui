import React from 'react';
import { StyledProps } from 'styled-components';
import { BoxProps } from 'reakit';
import { Icon, IconName } from '../Icon/Icon';

import * as S from './Link.style';

export type LinkProps = BoxProps &
	StyledProps<any> &
	React.AnchorHTMLAttributes<any> & {
		/** The name of the icon to display before */
		iconBefore?: IconName;
		/** The name of the icon to display after */
		iconAfter?: IconName;
		/** if the link is disabled */
		disabled?: boolean;
		/** if the link is external but the icon must not be shown */
		hideExternalIcon?: boolean;
	};

const Link: React.FC<LinkProps> = React.forwardRef(
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
		const isBlank = React.useMemo(() => target?.toLowerCase() === '_blank', [target]);

		const isExternal = React.useMemo(() => {
			return /^https?:\/\//i.test(href) && new URL(href).host !== location.host;
		}, [target]);

		const getTitle = React.useCallback(() => {
			if (disabled && title) return `${title} (this link is disabled)`;
			if (disabled) return 'This link is disabled';
			if (isExternal && title) return `${title} (open in a new tab)`;
			if (isExternal) return 'Open in a new tab';
			return title;
		}, [disabled, title, isExternal]);

		return (
			<S.Link
				rel={isBlank ? 'noopener noreferrer' : null}
				{...rest}
				href={!disabled ? href : null}
				className={`link ${disabled ? 'link--disabled' : ''} ${className || ''}`}
				title={getTitle()}
				ariaDisabled={disabled ? 'true' : null}
				ref={ref}
			>
				{iconBefore && (
					<Icon className="link__icon link__icon--before" name={iconBefore} currentColor />
				)}
				<span className="link__text">{children}</span>
				{isExternal && !hideExternalIcon && (
					<Icon className="link__icon link__icon--external" name="talend-link" currentColor />
				)}
				{iconAfter && (
					<Icon className="link__icon link__icon--after" name={iconAfter} currentColor />
				)}
			</S.Link>
		);
	},
);

export default Link;
