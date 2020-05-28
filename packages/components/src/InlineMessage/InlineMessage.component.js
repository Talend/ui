import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from './../Icon/Icon.component';
import css from './InlineMessage.scss';

/**
 * @param {object} props react props
 * @example
 const props = {
			type: 'Successful',
			title: 'Successful',
			description: 'Description',
			icon: 'fa fa-check',
			link: {
				label: 'See more',
				href: 'https://custom.url',
			}
			withBackground,
	};
 <InlineMessage {...props}/>
 */

export const TYPES = {
	INFO: 'info',
	SUCCESSFUL: 'success',
	WARNING: 'warning',
	ERROR: 'error',
};

export const getbsStyleFromType = type => {
	const typesMap = {
		[TYPES.INFO]: 'info',
		[TYPES.SUCCESSFUL]: 'success',
		[TYPES.WARNING]: 'warning',
		[TYPES.ERROR]: 'danger',
	}
	return typesMap[type] || '';
}

export function InlineMessage({ type, title, description, icon, link, withBackground }) {
	const rootClassnames = classNames(css['tc-inline-message'], 'tc-inline-message');
	const wrapperClassnames = classNames(css['tc-inline-message-wrapper'], 'tc-inline-message-wrapper', css[getbsStyleFromType(type)], {
		[css.background]: withBackground,
	});

	const iconClassnames = classNames(
		css['tc-inline-message-icon'],
		'tc-inline-message-icon',
		css[getbsStyleFromType(type)],
	);

	return (
		<div role="inline-message" className={rootClassnames}>
			<span className={wrapperClassnames}>
				{icon && (<span className={iconClassnames}>
					<Icon name={icon} />
				</span>)}
				{title && <span className={classNames(css['tc-inline-message-title'], 'tc-inline-message-title')}>
					{title}
				</span>}
				<span className={classNames(css['tc-inline-message-description'], 'tc-inline-message-description')}>
					{description}
				</span>
				{link && (
					<a
						className={classNames(css['tc-inline-message-link'], 'tc-inline-message-link')}
						target="_blank"
						rel="noopener noreferrer"
						href={link.href}
					>
						{link.label}
					</a>)}
			</span>
		</div>
	);
}

InlineMessage.displayName = 'InlineMessage';

InlineMessage.propTypes = {
	type: PropTypes.oneOf([
		TYPES.INFO,
		TYPES.SUCCESSFUL,
		TYPES.WARNING,
		TYPES.ERROR,
	]),
	icon: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	link: PropTypes.string,
	withBackground: PropTypes.bool,
};
