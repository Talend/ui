import PropTypes from 'prop-types';
import React from 'react';

import { InlineMessage as CoralInlineMessage } from '@talend/design-system';
import Link from '../Link';

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
const TYPES = {
	INFO: 'info',
	SUCCESSFUL: 'success',
	WARNING: 'warning',
	ERROR: 'error',
};

export function InlineMessage({ type, icon, link, ...props }) {
	let InlineMessageVariant;
	switch (type) {
		case TYPES.INFO:
			InlineMessageVariant = CoralInlineMessage.Information;
			break;
		case TYPES.SUCCESSFUL:
			InlineMessageVariant = CoralInlineMessage.Success;
			break;
		case TYPES.WARNING:
			InlineMessageVariant = CoralInlineMessage.Warning;
			break;
		case TYPES.ERROR:
			InlineMessageVariant = CoralInlineMessage.Destructive;
			break;
		default:
			InlineMessageVariant = CoralInlineMessage;
	}
	return (
		<InlineMessageVariant
			{...props}
			link={
				link && (
					<Link iconBefore={icon} {...link}>
						{link.label}
					</Link>
				)
			}
		/>
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
