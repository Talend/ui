import PropTypes from 'prop-types';
import React from 'react';

import CoralInlineMessage from '@talend/design-system/lib/components/InlineMessage';
import CoralLink from '@talend/design-system/lib/components/Link';

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

export const getComponentByType = type => {
	const typesMap = {
		[TYPES.INFO]: CoralInlineMessage.Information,
		[TYPES.SUCCESSFUL]: CoralInlineMessage.Success,
		[TYPES.WARNING]: CoralInlineMessage.Warning,
		[TYPES.ERROR]: CoralInlineMessage.Destructive,
	};
	return typesMap[type] || '';
};

export function InlineMessage({ type, icon, link, ...rest }) {
	const Component = getComponentByType(type);
	return (
		<Component
			{...rest}
			link={link ? <CoralLink {...link}>{link.label}</CoralLink> : null}
		/>
	);
}

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
