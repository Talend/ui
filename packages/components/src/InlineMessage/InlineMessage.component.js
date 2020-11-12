import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon/Icon.component';
import InlineMessageCss from './InlineMessage.scss';
import { getTheme } from '../theme';

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

const getbsStyleFromType = type => {
	const typesMap = {
		[TYPES.INFO]: 'info',
		[TYPES.SUCCESSFUL]: 'success',
		[TYPES.WARNING]: 'warning',
		[TYPES.ERROR]: 'danger',
	};
	return typesMap[type] || '';
};

const theme = getTheme(InlineMessageCss);

export function InlineMessage({ type, title, description, icon, link, withBackground }) {
	const rootClassnames = theme('tc-inline-message');

	const textClasses = theme('tc-inline-message-text', getbsStyleFromType(type), {
		background: withBackground,
	});

	const iconClassnames = theme('tc-inline-message-icon', getbsStyleFromType(type));

	return (
		<div className={rootClassnames}>
			<span className={iconClassnames}>
				<Icon name={icon} />
			</span>
			<div className={textClasses}>
				{title && (
					<span className={theme('tc-inline-message-title', 'tc-inline-message-text-item')}>
						{title}
					</span>
				)}
				{description && (
					<span className={theme('tc-inline-message-description', 'tc-inline-message-text-item')}>
						{description}
					</span>
				)}
				{link && (
					<a className={theme('tc-inline-message-link')} href={link.href} {...link.props}>
						{link.label}
					</a>
				)}
			</div>
		</div>
	);
}

InlineMessage.TYPES = TYPES;

InlineMessage.displayName = 'InlineMessage';

InlineMessage.propTypes = {
	type: PropTypes.oneOf(Object.values(TYPES)),
	icon: PropTypes.string.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	link: PropTypes.shape({
		href: PropTypes.string,
		label: PropTypes.string,
		props: PropTypes.object,
	}),
	withBackground: PropTypes.bool,
};
