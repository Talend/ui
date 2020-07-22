import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import { Button } from 'reakit';

import Icon from '../Icon/Icon';

import tokens from '../../tokens';

export type LinkProps = {
	/** The name of the icon to display before */
	before?: string;
	/** The name of the icon to display after */
	after?: string;
	/** The title of the link */
	title?: string;
	/** The href of the link */
	href?: string;
	/** The target of the link */
	target?: string;
	/** if the link is disabled */
	disabled?: boolean;
};

const ButtonAsLink = styled(Button)(
	({ theme }) => `
	--link-color: ${theme.colors.activeColor};
	--link-hover-color: ${shade(0.2, theme.colors.activeColor)};
	--link-active-color: ${shade(0.4, theme.colors.activeColor)};
	
	color: var(--link-color);
	
	&:hover,
	&:active {
		.link__text {
			text-decoration: underline;
		}
	}
	
	&:hover {
		color: var(--link-hover-color);

		.link__icon {
			fill: var(--link-hover-color);
		}
	}
	
	&:active {
		color: var(--link-active-color);

		.link__icon {
			fill: var(--link-active-color);
		}
	}
	
	&.link--disabled {
		cursor: not-allowed;
		opacity: ${tokens.opacity.disabled};
		
		.link__text {
			text-decoration: none;
		}
	}

	.link__icon {
		display: inline-block;
		vertical-align: baseline;
		width: ${tokens.sizes.smallerr};
		fill: currentColor;
  		
  		&--before {
  			margin-right: ${tokens.space.smaller};
		}
  		
  		&--external,
	 	&--after {
			margin-left: ${tokens.space.smaller};
		}
	}
`,
);

const Link: React.FC<LinkProps> = ({
	after,
	before,
	// @ts-ignore
	children,
	// @ts-ignore
	className,
	disabled,
	href,
	target,
	title,
	...rest
}: LinkProps) => {
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
		<ButtonAsLink
			as="a"
			rel={isBlank ? 'noopener noreferrer' : null}
			{...rest}
			href={!disabled ? href : null}
			className={`link ${disabled ? 'link--disabled' : ''} ${className ? className : ''}`}
			target={target}
			title={getTitle()}
			aria-disabled={disabled ? 'true' : null}
		>
			{before && <Icon className="link__icon link__icon--before" name={before} />}
			<span className="link__text">{children}</span>
			{isExternal && <Icon className="link__icon link__icon--external" name="link" />}
			{after && <Icon className="link__icon  link__icon--after" name={after} />}
		</ButtonAsLink>
	);
};

export default Link;
