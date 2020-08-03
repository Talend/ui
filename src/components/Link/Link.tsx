import React from 'react';

import Icon from '../Icon/Icon';

import * as S from './Link.style';

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
	target?: '_self' | '_blank' | '_parent' | '_top';
	/** if the link is disabled */
	disabled?: boolean;
};

const Link: React.FC<LinkProps> = React.forwardRef(
	(
		{ after, before, children, className, disabled, href, target, title, ...rest }: LinkProps,
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
				as="a"
				rel={isBlank ? 'noopener noreferrer' : null}
				{...rest}
				href={!disabled ? href : null}
				className={`link ${disabled ? 'link--disabled' : ''} ${className ? className : ''}`}
				target={target}
				title={getTitle()}
				ariaDisabled={disabled ? 'true' : null}
				ref={ref}
			>
				{before && <Icon className="link__icon link__icon--before" name={before} />}
				<span className="link__text">{children}</span>
				{isExternal && <Icon className="link__icon link__icon--external" name="link" />}
				{after && <Icon className="link__icon link__icon--after" name={after} />}
			</S.Link>
		);
	},
);

export default Link;
