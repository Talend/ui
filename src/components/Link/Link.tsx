import React from 'react';
import { StyledProps } from 'styled-components';
import { BoxProps } from 'reakit/Box';
import Icon, { IconName } from '../Icon/Icon';

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
			...rest
		}: LinkProps,
		ref,
	) => {
		const isBlank = target?.toLocaleLowerCase().includes('blank');
		const isExternal = href?.toLocaleLowerCase().includes('http');

		function getTitle() {
			if (disabled && title) return `${title} (this link is disabled)`;
			if (disabled) return `This link is disabled`;
			if (isExternal && title) return `${title} (open in a new tab)`;
			if (isExternal) return `Open in a new tab`;
			return title;
		}

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
				{iconBefore && <Icon className="link__icon link__icon--before" name={iconBefore} />}
				<span className="link__text">{children}</span>
				{isExternal && <Icon className="link__icon link__icon--external" name="link" />}
				{iconAfter && <Icon className="link__icon link__icon--after" name={iconAfter} />}
			</S.Link>
		);
	},
);

export default Link;
